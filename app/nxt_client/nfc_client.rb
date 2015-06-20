# require_relative 'config/env'

# config/env.rb
require 'logger'
require 'json'
require 'net/http'

require 'bundler/setup'
Bundler.require :default

# logger
L = Logger.new(STDOUT)

def log(str)
  L.info str
end


path = File.expand_path "../", __FILE__
account_path = "#{path}/config/account.json"
account_not_found_message = "Please setup 'config/account.json' file with your credentials, because it doesn't exist and it probably failed to autogenerate (see readme)"
raise account_not_found_message unless File.exist? account_path
CONFIG = JSON.parse File.read account_path

class Account
  def initialize
    @config = CONFIG
  end

  def id
    @config[:id.to_s]
  end

  def public_key
    @config[:public_key.to_s]
  end

  def secret
    @config[:secret.to_s]
  end
end


class NXTClient

  HOST = "http://jnxt.org:7876"
  # HOST = "http://localhost:7876"

  def initialize
    @account = Account.new
  end

  def account
    # request not needed
    #
    # requestType=getAccount&account=<account_id>
    {
      id:         @account.id,
      public_key: @account.public_key
    }
  end

  def balance
    bal = get(
      requestType: :getBalance,
      account:     @account.id
    )

    {
      nqt: bal["balanceNQT"].to_i
    }
  end

  def send_nxt(amount, account_id, public_key=nil)
    resp = post(
      requestType:        :sendMoney,
      recipient:          account_id,
      recipientPublicKey: public_key,
      secretPhrase:       @account.secret,
      amountNQT:          amount,
      deadline:           60,
      feeNQT:             100000000
    )

    log "send_nxt: #{resp}"
    if resp["errorDescription"]
      { error: resp["errorDescription"] }
    else
      { success: true, new_balance: "antani :D" }
    end
  end


  private

  def base_url
    "#{HOST}/nxt"
  end

  def get(params)
    uri  = URI "#{base_url}?#{hash_to_query(params)}"
    resp = Net::HTTP.get_response uri
    JSON.parse resp.body
  end

  def post(params)
    uri     = URI base_url
    http    = Net::HTTP.new uri.host, uri.port
    request = Net::HTTP::Post.new uri.request_uri
    request.set_form_data params
    resp    = http.request request
    JSON.parse resp.body
  end

  def hash_to_query(hash)
    URI.encode_www_form hash
  end
end



# nfc_client.rb (this file)
require 'sinatra'

client = NXTClient.new

before { content_type :json }

path  = File.expand_path "../../../", __FILE__
set :public_folder, "#{path}/ui"


get "/account" do
  account = client.account
  log "account: #{account}"
  account.to_json
end

get "/balance" do
  balance = client.balance
  log "balance: #{balance}"
  balance.to_json
end

post "/send" do#  |amount, account_id, public_key|
  #  "/send/10000/NXT-antani/public_key_antani"
  amount     = params[:amount]
  account_id = params[:account_id]
  public_key = params[:public_key]
  log "send:(#{amount}, #{account_id}, #{public_key})"
  response   = client.send_nxt(amount, account_id, public_key)
  log "response: #{response}"
  response.to_json
end

get "/rate" do
  url = "https://nxtblocks.info/xhr/market_direct/?id=NXT_stats"
  resp = Net::HTTP.get_response URI url
  resp.body
end

# p client.send
