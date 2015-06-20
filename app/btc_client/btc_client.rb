# require_relative 'config/env'

# config/env.rb
require 'logger'
require 'bundler/setup'
Bundler.require :default

# logger
L = Logger.new(STDOUT)

def log(str)
  L.info str
end


# bitcoin.conf
file = File.read File.expand_path( "~/.bitcoin/bitcoin.conf" )
password = file.match(/rpcpassword=(.+)/)[1]
RPC_PASSWORD = password

BTC_CLIENT = BitcoinClient::Client.new 'bitcoin', RPC_PASSWORD

# btc_client.rb - this file

require 'sinatra'

client = BTC_CLIENT

before { content_type :json }

path  = File.expand_path "../../../", __FILE__
set :public_folder, "#{path}/ui"


get "/address" do
  address = client.getaccountaddress ""
  log "get_address: #{address}"
  { address: address }.to_json
end

get "/balance" do
  balance = client.balance
  log "balance: #{balance}"
  { balance: balance }.to_json
end

post "/send/*/*" do |amount, recipient|
  #  "/send/10000/1antani..."
  amount_satoshis = amount
  log "TODO: implement"
  { success: true, new_balance: "0.1337" }
end

# p client.send
