require 'bundler/setup'
Bundler.require :default

require_relative "../lib/logger"
require_relative "bitconf"

BTC_CLIENT = BitcoinClient::Client.new 'bitcoin', RPC_PASSWORD
