/*global rivets window*/
(function plainOldJs(rivets, window) {
  'use strict';

  var NXTWrapper = function NXTWrapper() {
    }
    , mainWallet
    , viewModel = {}
    , currencyConvertionInterval = 1000 /*ms*/ * 60 /*sec*/ * 3 /*min*/
    , appElement = $('#app')
    , checkBalanceButtonElement = $('#refresh-balance')
    , accountToSendElement = $('#account-to')
    , publicKeyToSendElement = $('#public-key-to')
    , amountToSendElement = $('#amount-to')
    , sendAssetsButtonElement = $('#send-assets')
    , currencyConvertionIntervalIndentifier
    , onCurrencyConvertionIntervalTick = function onCurrencyConvertionIntervalTick() {

      mainWallet.currencyConvertion();
    }
    , onCheckBalanceButtonElementClick = function onCheckBalanceButtonElementClick() {

      mainWallet.getBalance();
      window.clearInterval(currencyConvertionIntervalIndentifier);
      currencyConvertionIntervalIndentifier = window.setInterval(onCurrencyConvertionIntervalTick, currencyConvertionInterval);
    }
    , onSendAssetsButtonElementClick = function onSendAssetsButtonElementClick() {

      var accountToSendValue = accountToSendElement.val()
        , publicKeyToSendValue = publicKeyToSendElement.val()
        , amountToSendValue = amountToSendElement.val();
      if (accountToSendValue ||
        publicKeyToSendValue ||
        amountToSendValue) {

        mainWallet.send(amountToSendValue, accountToSendValue, Number(publicKeyToSendValue));
      }
    }
    , onInputClick = function onInputClick() {

      var accountToSendValue = accountToSendElement.val()
        , publicKeyToSendValue = publicKeyToSendElement.val()
        , amountToSendValue = amountToSendElement.val();

      if (accountToSendValue &&
        publicKeyToSendValue &&
        amountToSendValue) {

        sendAssetsButtonElement.removeAttr('disabled');
      } else if (!sendAssetsButtonElement.is(':disabled')) {

        sendAssetsButtonElement.attr('disabled', 'disabled');
      }
    };

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

        viewModel.nqtBalance = response.nqt;
        self.currencyConvertion();
      }
    });
  };

  NXTWrapper.prototype.send = function send(amountToSend, accountIdToSend, accountPublicKeyToSend) {

    if (!amountToSend ||
      !accountIdToSend ||
      !accountPublicKeyToSend) {

      throw 'Parameters are all manadatory or amount is not a number';
    }

    $.ajax({
      'method': 'POST',
      'url': '/send/' + amountToSend + '/' + accountIdToSend + '/' + accountPublicKeyToSend
    }).done(function(response) {

      window.console.log(response);
    });
  };

  NXTWrapper.prototype.currencyConvertion = function currencyConvertion() {

    $.ajax({
      'url': '/rate'
    }).done(function(response) {

      if (response && viewModel.nqtBalance) {

        var nxtToUsd = response['nxt_usd']
          , nxtToEur = response['nxt_eur']
          , nxtBtc = response['nxt_btc']
          , nqtToNxt = 100000000;

        viewModel.balance = viewModel.nqtBalance / nqtToNxt;

        viewModel.rate = {};
        viewModel.rate.usd = Math.round(viewModel.balance * nxtToUsd * 100) / 100;
        viewModel.rate.eur = Math.round(viewModel.balance * nxtToEur * 100) / 100;
        viewModel.rate.btc = Math.round(viewModel.balance * nxtBtc * nqtToNxt) / nqtToNxt;
      }
    });
  };

  mainWallet = new NXTWrapper();

  mainWallet.getAccount();
  mainWallet.getBalance();

  currencyConvertionIntervalIndentifier = window.setInterval(onCurrencyConvertionIntervalTick, currencyConvertionInterval);


  rivets.bind(appElement, viewModel);
  checkBalanceButtonElement.on('click', onCheckBalanceButtonElementClick);
  sendAssetsButtonElement.on('click', onSendAssetsButtonElementClick);
  accountToSendElement.on('click', onInputClick);
  publicKeyToSendElement.on('click', onInputClick);
  amountToSendElement.on('click', onInputClick);

  accountToSendElement.on('blur', onInputClick);
  publicKeyToSendElement.on('blur', onInputClick);
  amountToSendElement.on('blur', onInputClick);
}(rivets, window));
