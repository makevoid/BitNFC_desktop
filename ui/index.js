/*global rivets window*/
(function plainOldJs(rivets, window) {
  'use strict';

  var NXTWrapper = function NXTWrapper() {
    }
    , mainWallet
    , viewModel = {}
    , appElement = $('#app')
    , checkBalanceButtonElement = $('#refresh-balance')
    , onCheckBalanceButtonElementClick = function onCheckBalanceButtonElementClick() {

      mainWallet.getBalance();
    }

  NXTWrapper.prototype.getAccount = function getAccount() {

    $.ajax({
      'url': '/account'
    }).done(function(response) {

      if (response) {

        viewModel.address = response.id;
        viewModel.publicKey = response["public_key"];
      }
    });
  };

  NXTWrapper.prototype.getBalance = function getBalance() {

    var self = this;
    $.ajax({
      'url': '/balance'
    }).done(function(response) {

      if (response) {

        viewModel.balance = response.nxt;
        self.currencyConvertion();
      }
    });
  };

  NXTWrapper.prototype.send = function (amountToSend, accountIdToSend, accountPublicKeyToSend) {

    if (!amountToSend || !accountIdToSend || !accountPublicKeyToSend || window.isNaN(amountToSend)) {

      throw 'Parameters are all manadatory or amount is not a number';
    } else {

      $.ajax({
        'method': 'POST',
        'url': '/send/' + amountToSend + '/' + accountIdToSend + '/' + accountPublicKeyToSend
      }).done(function(response) {

        window.console.log(response);
      });
    }
  };

  NXTWrapper.prototype.currencyConvertion = function currencyConvertion() {

    $.ajax({
      'url': '/rate'
    }).done(function(response) {

      if (response && viewModel.balance) {

        var nxtToUsd = response['nxt_usd']
          , nxtToEur = response['nxt_eur']
          , nxtBtc = response['nxt_btc']
          , nqtToNxt = 100000000;

        viewModel.balance = viewModel.balance / nqtToNxt;

        viewModel.rate = {};
        viewModel.rate.usd = viewModel.balance * nxtToUsd;
        viewModel.rate.eur = viewModel.balance * nxtToEur;
        viewModel.rate.btc = viewModel.balance * nxtBtc;
      }
    });
  };

  mainWallet = new NXTWrapper();

  mainWallet.getAccount();
  mainWallet.getBalance();


  rivets.bind(appElement, viewModel);
  checkBalanceButtonElement.on('click', onCheckBalanceButtonElementClick);

/*
// var bitcoin = Bitcoin.init()
// bitcoin.send


// models (defaults)
var models = {
  Key: {
    // nothing
  }
}


// store - object state storage
var store  = {
  keys: []
}

var walletActions = {
  send: function(amount, addresses)  {
    // TODO
  },

  getAddress: function(cb) {
    var key = models.Key
    key.id = store.keys.length
    fetch('http://localhost:3001/address')
      .then(function(response) {
        response.json().then(function(address) {
          var generatedKey = address
          key = $.extend(generatedKey, key)
          key.balance = 'loading...'
          store.keys.push(key)
          return cb()
        })
      })
  }

}



// TODO:

// walletActions.send()
// walletActions.balance()

walletActions.getAddress(function(){

  // view bind
  rivets.bind($('.entries'), store.keys[0])

  // load view (presenters)
  // if (store.keys[0]) {
  var address = store.keys[0].address
  console.log(address)
  store.keys[0].address_blockchain_url = 'https://blockchain.info/address/'+address
  // }

  store.keys[0].amountFiat = '-'
})




// rivets.bind($('.entries'), messages)



$('#app').on('click', '.btn-send', function(evt){
  // TODO <button class='btn-send' rv-on-click='item.send'>Send</button>

  var amount = 0.0001 // BTC // 1000 // satoshi

  var addresses = []

  var address = document.querySelector('input[name=address_to]').value

  addresses.push(address)

  mainWallet.send(amount, addresses) // gogogo! TODO Callback
})


$('#app').on('click', '.balance_check', function(evt){
  Bitcoin.balance(function(balance){
    console.log('balance: ', balance)
    store.keys[0].balance     = balance
    store.keys[0].balance_btc = balance*Math.pow(10, -8)
  })
})

var updateAmountFiat = function(evt) {
  console.log('TODO: update amount fiat')
  store.keys[0].amountFiat = 'update'
}

$('#app').on('change', 'input[name=address_to]', updateAmountFiat)
$('#app').on('change', 'input[name=currency_to]', updateAmountFiat)
*/
}(rivets, window));
