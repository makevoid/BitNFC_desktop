require 'logger'

L = Logger.new(STDOUT)

def log(str)
  L.info str
end
