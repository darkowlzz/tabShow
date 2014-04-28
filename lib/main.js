const app = require('sdk/system/xul-app');

let appinfo = app.name;

// Identify the app and execute accordingly.
if (appinfo == 'Fennec') {
  console.log('app started');
  let { Mobile } = require('mobile');
  let mobile = new Mobile(appinfo);
}
else {

  const ui = require('sdk/ui');
  let tabs = require('sdk/tabs');

  let TabTitle = require('./tabTitle');
  let ToolbarUi = require('./toolbarUi');

  // Create a ToolbarUi object to embed in the browser.
  let tools = new ToolbarUi();

  // Add toolbar items into the toolbar.
  let toolbar = ui.Toolbar({
    title: 'Tab-show',
    items: [tools.previous, tools.play, tools.next, tools.tabTitle]
  });

  let tabTitle = new TabTitle(tools);

}
