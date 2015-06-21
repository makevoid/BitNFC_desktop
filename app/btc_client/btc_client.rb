require_relative 'config/env'

client = BTC_CLIENT

class BtcClient < Sinatra::Application

  # configs

  before { content_type :json }

  path  = File.expand_path "../../../", __FILE__
  set :public_folder, "#{path}/ui"

  # routes

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

  get "/" do
    content_type :html
    File.read "#{path}/ui/index.html"
  end

  # p client.send

end
