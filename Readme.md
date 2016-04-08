# Confirm-dialog

A confirm dialog works on both desktop and mobile phone.

[demo](https://chemzqm.github.io/confirm-dialog)

## Install

    npm install confirm-dialog


## Usage

``` js
var confirm = require('confirm-dailog')
confirm('Are you sure?').then(function() {
  // yes
}, function() {
  // no
})
```

_Style css class `confirm-footer` for custom style_

## API

### Confirm(msg, [opt])

* `opt.style` contains style override default styl
* `opt.yes` yes text for dialog
* `opt.no` no text for dialog
