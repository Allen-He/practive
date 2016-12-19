;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-jiantouarrow496" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M804.67968 552.42752l0 349.15328L685.18912 901.5808 685.18912 552.42752c0-54.5792-14.2336-95.05792-43.50976-123.77088-41.6768-40.88832-103.03488-47.23712-121.7024-48.16896l-85.85216 0 49.21344 124.60032c1.65888 4.17792 0.31744 8.93952-3.25632 11.64288-3.584 2.7136-8.54016 2.69312-12.10368-0.0512L223.22176 328.4992c-2.44736-1.90464-3.90144-4.80256-3.90144-7.91552 0-3.10272 1.45408-6.02112 3.90144-7.90528l244.75648-188.18048c1.80224-1.3824 3.93216-2.05824 6.0928-2.05824 2.10944 0 4.21888 0.65536 6.01088 2.00704 3.584 2.69312 4.9152 7.46496 3.25632 11.65312l-49.21344 124.59008 63.34464 0.18432c0 0 6.07232 0.33792 14.4896 1.05472l-0.03072-1.06496c5.36576-0.11264 127.85664-1.45408 213.43232 82.49344C778.00448 394.97728 804.67968 465.31584 804.67968 552.42752z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
