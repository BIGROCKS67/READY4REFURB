// Cookie choice for the Facebook (Meta) pixel. Nothing from Facebook loads until the
// visitor presses "Accept". Reject is the same size and one click. The choice is kept
// in this browser only; "Cookie settings" in the footer reopens the banner.
(function () {
  var KEY = 'r4r-consent'
  var PIXEL_ID = '1488165256328481'

  function read() { try { return localStorage.getItem(KEY) } catch (e) { return null } }
  function save(v) { try { localStorage.setItem(KEY, v) } catch (e) {} }

  function loadPixel() {
    if (window.fbq) return
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID)
    window.fbq('track', 'PageView')
  }

  function banner() {
    if (document.getElementById('r4r-consent')) return
    var el = document.createElement('div')
    el.id = 'r4r-consent'
    el.setAttribute('role', 'region')
    el.setAttribute('aria-label', 'Cookie choice')
    el.style.cssText = 'position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:100;max-width:30rem;margin-left:auto;background:#ffffff;color:#0a0908;border:1px solid #d8d8d8;border-radius:10px;padding:1rem 1.1rem;font:15px/1.5 system-ui,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,0.15)'
    el.innerHTML = '<p style="margin:0 0 .75rem">Can we use a Facebook cookie to see which of our adverts bring people here? The site works the same either way. <a href="/privacy/" style="color:inherit">Privacy and cookies</a></p>' +
      '<div style="display:flex;gap:.5rem">' +
      '<button type="button" data-v="yes" style="flex:1;padding:.65rem;border-radius:6px;border:1px solid #0a0908;background:#0a0908;color:#fff;font:inherit;cursor:pointer">Accept</button>' +
      '<button type="button" data-v="no" style="flex:1;padding:.65rem;border-radius:6px;border:1px solid #0a0908;background:#0a0908;color:#fff;font:inherit;cursor:pointer">Reject</button></div>'
    el.addEventListener('click', function (e) {
      var v = e.target.getAttribute && e.target.getAttribute('data-v')
      if (!v) return
      var before = read()
      save(v)
      el.remove()
      if (v === 'yes') loadPixel()
      else if (before === 'yes') location.reload() // drop a pixel that already loaded
    })
    if (window.innerWidth <= 640) el.style.bottom = 'calc(4.5rem + env(safe-area-inset-bottom))' // clear the call/quote bar
    document.body.appendChild(el)
  }

  window.r4rCookieSettings = banner
  var choice = read()
  if (choice === 'yes') loadPixel()
  else if (choice !== 'no') banner()
})()
