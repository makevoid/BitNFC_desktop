# BitNFC desktop

Built using electrum

Ruby/Coffee/Node BitcoinClient (Bitcoin Core) API

### Installation

    sh setup.sh

### Build (Run)

    sh build.sh



##### Submodules notes

   git submodule init && git submodule update

   git submodule add GIT_URL


##### NXT calls

 - Balance: http://jnxt.org:7876/nxt?requestType=getBalance&account=<account_id>
 - Account Infos: http://localhost:7876/nxt?requestType=getAccount&account=<account_id>
 - Send money: http://jnxt.org:7876/nxt?requestType=sendMoney&recipient=<recipient_account_id>&recipientPublicKey=<recipient_public_key>&secretPhrase=<phrase>&amountNQT=<amount>&deadline=60&feeNQT=100000000
