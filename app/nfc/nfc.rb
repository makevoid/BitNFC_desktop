require 'logger'
require 'bundler/setup'
Bundler.require :default

L = Logger.new(STDOUT)

def log(str)
  L.info str
end

ctx = NFC::Context.new

dev = ctx.open nil

loop do
  log dev.select
  sleep 0.3
end

private_keys_mapping = {
  "04DDB7E2833480" => "5antani1",
  "04E8B7E2833480" => "5antani2",
  "04778FE2833480" => "5antani3",
}
