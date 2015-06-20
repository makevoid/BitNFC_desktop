var nfc  = require('nfc')
  , util = require('util')
  ;

var n = nfc();

console.log(JSON.stringify(n))

// var nfc = require('nfc').nfc;
// var n = new nfc();
//
// n.on('uid', function(uid) {
//     console.log('UID:', uid);
// });
//
// n.on('uid', function(uid) {
//     console.log('UID:', uid);
// });
//
// n.start();


////

// var mifare = require("mifare-classic")
// var ndef   = require("ndef")
//
// mifare.read(function (err, data) {
//   if (err) throw err;
//   var message = ndef.decodeMessage(data.toJSON());
//   console.log(ndef.stringify(message));
// });
