const ui = require('sdk/ui');

let ToolbarUi = require('./toolbarUi');

// Create a ToolbarUi object to embed in the browser.
let tools = new ToolbarUi();

// Add toolbar items into the toolbar.
let toolbar = ui.Toolbar({
  title: 'Tab-show',
  items: [tools.previous, tools.play, tools.next]
});
