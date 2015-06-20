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

CONFIG =


class Account
  def initialize

  end

  def id
    "NXT-DQK6-MEWH-8BAM-BKL3A"
  end

  def public_key
    "cfc65baff36ea0894c8dcd8bc20290501022811637eb860029a442d4fc3b210c"
  end

  def secret
    ""
  end
end


class NXTClient


  HOST = "http://jnxt.org:7876"

  def initialize
    @account = Account.new
  end

  def account
    # requestType=getBalance&account=<account_id>
    # get
    {
      id: "NXT-antani",
      public_key: "antanicomeseffosse"
    }
  end

  def balance
    # requestType=getBalance&account=<account_id>
    # get(
    #   requestType: :getBalance,
    #   account:
    # )
    { nxt: 1000000 }
  end

  def send(amount, address, pubkey=nil)

    { success: "true", new_balance: "999999" }
  end

  private

  def get(params)
    uri  = URI "#{HOST}/nxt?#{hash_to_query(params)}"
    resp = Net::HTTP.get_response uri
    JSON.parse resp.body
  end

  def post(url, params)
    resp = Net::HTTP.get_response uri
    JSON.parse resp.body
  end

  def hash_to_query(hash)
    CGI.unescape(hash).to_query
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

post "/send" do#  |amount, address, public_key|
  #  "/send/10000/NXT-antani/public_key_antani"
  amount = params[:amount]
  address = params[:address]
  public_key = params[:public_key]

  balance = client.send(amount, address, public_key)

  log "TODO: implement"
  balance
end

# p client.send
