// Dom7
var $ = Dom7;

// Demo
if (document.location.href.includes('safe-areas')) {
  const html = document.documentElement;
  if (html) {
    html.style.setProperty('--f7-safe-area-top', '44px');
    html.style.setProperty('--f7-safe-area-bottom', '34px');
  }
}
if (document.location.href.includes('example-preview')) {
  $('.view-main').attr('data-browser-history', 'true');
  $('.view-main').attr('data-browser-history-root', '/kitchen-sink/core/');
  $('.view-main').attr('data-preload-previous-page', 'false');
  $('.view-main').attr('data-ios-swipe-back', 'false');
  document.documentElement.classList.add('example-preview');
}

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}
if (document.location.search.indexOf('mode=') >= 0) {
  const mode = document.location.search.split('mode=')[1].split('&')[0];
  if (mode === 'dark') document.documentElement.classList.add('dark');
}

// Init App
var app = new Framework7({
  el: '#app',
  theme,
  // store.js,
  store: store,
  // routes.js,
  routes: routes,
  popup: {
    closeOnEscape: true,
  },
  sheet: {
    closeOnEscape: true,
  },
  popover: {
    closeOnEscape: true,
  },
  actions: {
    closeOnEscape: true,
  },
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
});

// function detectDevice() {
//   let pixelRatio = window.devicePixelRatio;
//   app.dialog.log('Device Pixel Ratio', pixelRatio);
// }

// function detectDevice() {
//   if (Framework7.device.tablet) {
//     handleTabletActions();
//   } else {
//     handleMobileActions();
//   }
//   handlePixelRatio(pixelRatio);
// }

// function handleTabletActions() {
//   app.dialog.alert('Tablet detected');
// }

// function handleMobileActions() {
//   app.dialog.alert('Mobile phone detected');
// }
