const ui = require('sdk/ui');

let toolbarUi = require('./toolbarUi');

let tools = new toolbarUi();
console.log('timer: ' + tools.ts.timer);

let toolbar = ui.Toolbar({
  title: 'Tab-show',
  items: [tools.previous, tools.play, tools.next]
});
