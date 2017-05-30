/* eslint-disable no-param-reassign*/
if (
  process.env.NODE_ENV === 'production' &&
  typeof window !== 'undefined' &&
  'serviceWorker' in navigator
) {
  navigator.serviceWorker
    .register('/sw.js', {
      scope: './'
    })
    .then(reg => {
      reg.onupdatefound = () => {
        console.log('In update found callback..........');
        const installingWorker = reg.installing;
        installingWorker.onstatechange = () => {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                console.log('New or updated content is available.');
              } else {
                console.log('Content is now available offline!');
              }
              break;
            case 'redundant':
              console.log('The installing serviceWorker became redundant.');
              // TODO
              // code for trying updating serviceWorker later on
              break;
            default:
              console.log('unknown serviceWorker event');
          }
        };
      };
    })
    .catch(e => {
      console.error('Error during service worker registration:', e);
    });
}
