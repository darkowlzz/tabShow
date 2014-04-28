let nw = require('nativewindow');
let TabSwitch = require('./tabSwitch');

function Mobile(app) {
  let ts = new TabSwitch();

  function next() {
    console.log('next tab');
    ts.next();
  }

  let option = {
    label: 'NextTab',
    callback: next
  }

  nw.addMenu(option);
}

exports.Mobile = Mobile;
