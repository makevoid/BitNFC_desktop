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



### NXT part

##### NXT calls

 - Balance: http://jnxt.org:7876/nxt?requestType=getBalance&account=<account_id>
 - Account Infos: http://localhost:7876/nxt?requestType=getAccount&account=<account_id>
 - Send money: http://jnxt.org:7876/nxt?requestType=sendMoney&recipient=<recipient_account_id>&recipientPublicKey=<recipient_public_key>&secretPhrase=<phrase>&amountNQT=<amount>&deadline=60&feeNQT=100000000


##### Test accounts

wouldgo
Account ID:    NXT-YWY7-6VGY-4CGV-F8MLK
Public Key:    92a95ecec867980d2af3a7ca5a18b40e816e44e1ee7a7e513375dc7047768938

makevoid
Account ID:    NXT-DQK6-MEWH-8BAM-BKL3A
Public Key:    cfc65baff36ea0894c8dcd8bc20290501022811637eb860029a442d4fc3b210c
