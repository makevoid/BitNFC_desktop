bitconf_path = File.expand_path "~/.bitcoin/bitcoin.conf"
class BitcoinConfNotFound < RuntimeError; end
btc_conf_not_found_message = "Your bitcoin configuration (#{bitconf_path}) has not been found, exiting..."
raise BitcoinConfNotFound, btc_conf_not_found_message unless File.exist? bitconf_path
file = File.read bitconf_path
password = file.match(/rpcpassword=(.+)/)[1]
RPC_PASSWORD = password
