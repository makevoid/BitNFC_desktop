### NXT Client


install deps

    bundle


configure:

    cp config/account.template.json config/account.json

then edit the configs with your account id, public key and secret

---

run

    ruby nfc_client.rb -p 3001


open http://localhost:3001/index.html



API calls



http://localhost:3001/address

http://localhost:3001/balance

http://localhost:3001/send/<amount>/<nxt-account-id>/<pubkey>
