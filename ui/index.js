var get         = require("get-next")
var post        = require("post-json")
var rivets      = require("rivets")


// test command
//
// var b = Bitcoin.init(); b.send(0.00001, "197GxXSqqSAkhLXyy9XrtEySvssuDcQGMY")

// BchainApi.unspent("197GxXSqqSAkhLXyy9XrtEySvssuDcQGMY", function(result){
//  console.log(result) // => Object { unspent_outputs: Array[1] }
// })


var Bitcoin = {


  init: function() {
    return this
  },

  address: function(cb) {
    return "1antani";
  },

  send: function(amount, addresses) {

  },

  balance: function(cb) {
    fetch("http://localhost:3001/balance")
      .then(function(response) {
        response.json().then(function(data) {
          return cb(data.balance)
        })
      })
  }
}

window.Bitcoin = Bitcoin


var mainWallet = Bitcoin.init()


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
    fetch("http://localhost:3001/address")
      .then(function(response) {
        response.json().then(function(address) {
          var generatedKey = address
          key = $.extend(generatedKey, key)
          key.balance = "loading..."
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
  store.keys[0].address_blockchain_url = "https://blockchain.info/address/"+address
  // }

  store.keys[0].amountFiat = "-"
})




// rivets.bind($('.entries'), messages)



$("#app").on("click", ".btn-send", function(evt){
  // TODO <button class="btn-send" rv-on-click="item.send">Send</button>

  var amount = 0.0001 // BTC // 1000 // satoshi

  var addresses = []

  var address = document.querySelector("input[name=address_to]").value

  addresses.push(address)

  mainWallet.send(amount, addresses) // gogogo! TODO Callback
})


$("#app").on("click", ".balance_check", function(evt){
  Bitcoin.balance(function(balance){
    console.log("balance: ", balance)
    store.keys[0].balance     = balance
    store.keys[0].balance_btc = balance*Math.pow(10, -8)
  })
})

var updateAmountFiat = function(evt) {
  console.log("TODO: update amount fiat")
  store.keys[0].amountFiat = "update"
}

$("#app").on("change", "input[name=address_to]", updateAmountFiat)
$("#app").on("change", "input[name=currency_to]", updateAmountFiat)
