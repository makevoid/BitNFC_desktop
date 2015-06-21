# BitNFC Desktop wallet

powered by ruby sinatra, bitcoin-client, zepto.js, bootstrap ui

desktop packaging with electron

generate new addresses - shows private keys

next step: save keys into local storage

### Installation

```sh
npm install -g browserify
```

```sh
npm install
```

```sh
sh build.sh
```

### Visit page

open index.html

```sh
google-chrome index.html
```

or

```sh
firefox index.html
```

and open the console


### Development

build sass assets

```rb
bundle install
# will install guard

guard
# to watch the sass files and generate the main css
```

---

you can find an HD integrated wallet in a streaming micro transaction client app here:
https://github.com/720kb/biwi/blob/master/client/biwi.js
