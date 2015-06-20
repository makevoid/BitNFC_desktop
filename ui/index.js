/*global require window*/
(function plainOldJs(require, window) {
  'use strict';

  var rivets = require('rivets')
    , NXTWrapper = function NXTWrapper() {
    }
    , mainWallet

  NXTWrapper.prototype.getAccount = function getAccount() {

    $.ajax({
      'url': '/adresss'
    }).done(function(response) {

      window.console.log(response);
    });
  };

  NXTWrapper.prototype.getBalance = function getBalance() {

    $.ajax({
      'url': '/balance'
    }).done(function(response) {

      window.console.log(response);
    });
  };

  NXTWrapper.prototype.send = function (amountToSend, accountIdToSend, accountPublicKeyToSend) {

    if (!amountToSend || !accountIdToSend || !accountPublicKeyToSend || window.isNaN(amountToSend)) {

      throw 'Parameters are all manadatory or amount is not a number';
    } else {

      $.ajax({
        'method': 'POST'
        'url': '/send/' + amountToSend + '/' + accountIdToSend + '/' + accountPublicKeyToSend
      }).done(function(response) {

        window.console.log(response);
      });
    }
  };

  mainWallet = new NXTWrapper();


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
}(require, window));
