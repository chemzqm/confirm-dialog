var confirm = require('..')

confirm('Are you sure?').then(function () {
  console.log('yes')
}, function () {
  console.log('no')
})
