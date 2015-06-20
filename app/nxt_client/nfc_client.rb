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

class NXTClient
  def initialize

  end

  def address

  end

  def balance

  end

  def send(amount, address, pubkey)

  end
end



# nfc_client.rb (this file)
require 'sinatra'

client = NXTClient.new

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

post "/send/*/*/*" do |amount, address, pubkey|
  #  "/send/10000/NXT-antani/public_key_antani"

  log "TODO: implement"
  { success: true, new_balance: "0.1337" }
end

# p client.send
