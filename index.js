var event = require('event')
var ontap = require('ontap')
var classes = require('classes')
var offset = require('page-offset')
var domify = require('domify')
var template = require('./footer.html')
var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
var vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
var root = document.compatMode=='BackCompat'? document.body : document.documentElement
var detect = require('prop-detect')
var transform = detect.transform
var transition = detect.transition
var transitionEnd = detect.transitionend

function Confirm(msg, opt) {
  opt = opt || {}
  var body = document.body
  var overlay = document.createElement('div')
  classes(overlay).add('confirm-overlay')
  var rect = document.documentElement.getBoundingClientRect()
  var w = root.clientWidth
  assign(overlay.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    width: w + 'px',
    height: Math.max(rect.height, vh) + 'px',
    zIndex: 998,
    backgroundColor: 'rgba(0,0,0,0)'
  })
  body.appendChild(overlay)
  var top = offset.y + vh/2 - 30
  var left = vw/2 - 100
  var el = document.createElement('div')
  assign(el.style, {
    position: 'absolute',
    top: top + 'px',
    padding: '10px',
    zIndex: 999,
    border: '1px solid #000',
    textAlign: 'center',
    width: '200px',
    left: left + 'px',
    opacity: 0,
    backgroundColor: '#fff'
  })
  el.style[transform] = 'scale(0.8)'
  overlay.style[transition] = 'all 150ms linear'
  el.style[transition] = 'all 150ms cubic-bezier(0.04, 0.76, 0.41, 0.99)'
  setTimeout(function () {
    el.style[transform] = 'scale(1)'
    el.style.opacity = '1'
    overlay.style.backgroundColor = 'rgba(0,0,0,0.2)'
  })
  if (opt.style) {
    assign(el.style, opt.style)
  }
  classes(el).add('confirm-active')
  el.innerHTML = '<div>' + msg + '</div>'
  body.appendChild(el)
  template = template.replace(/\{\w+\}/g, function (word) {
    if (word == '{yes}') {
      return opt.yes || '确定'
    } else if (word == '{no}') {
      return opt.yes || '取消'
    }
  })
  var footer = domify(template)
  el.appendChild(footer)

  function cleanUp() {
    el.style.opacity = 0
    event.bind(el, transitionEnd, function end() {
      event.unbind(el, transitionEnd, end)
      if (el.parentNode) body.removeChild(el)
    })
    el.style[transform] = 'translateY(-20px)'
    body.removeChild(overlay)
  }

  return new Promise(function (resolve, reject) {
    ontap(footer,function (e) {
      var clz = classes(e.target)
      if (clz.has('yes')) {
        cleanUp()
        resolve()
      } else if (clz.has('no')) {
        cleanUp()
        reject()
      }
    })
  })
}


function assign(to, from) {
  Object.keys(from).forEach(function (k) {
    to[k] = from[k]
  })
  return to
}

module.exports = Confirm
