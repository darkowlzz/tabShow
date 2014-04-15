const ui = require('sdk/ui');
let tabs = require('sdk/tabs');

let ToolbarUi = require('./toolbarUi');

// Create a ToolbarUi object to embed in the browser.
let tools = new ToolbarUi();

// Add toolbar items into the toolbar.
let toolbar = ui.Toolbar({
  title: 'Tab-show',
  items: [tools.previous, tools.play, tools.next, tools.tabTitle]
});

/**
 * Update tab title in the frame
 * @param {Object} tab
 *    The active tab whose title is posted to the frame.
 */
function updateTitle(tab) {
  console.log('ready to get ready');
  tools.tabTitle.postMessage(tab.title, tools.tabTitle.url);
}


// Tab activate and deactivate listener to properly update tab title 
// in frame.
tabs.on('activate', (tab) => {
  console.log('activated!!');
  tools.tabTitle.postMessage(tab.title, tools.tabTitle.url);
  tab.on('ready', updateTitle);
});

tabs.on('deactivate', (tab) => {
  console.log('deactivate!!');
  tab.removeListener('ready', updateTitle);
});
