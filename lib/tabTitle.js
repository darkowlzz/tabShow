let tabs = require('sdk/tabs');

// TabTitle class
function TabTitle (tools) {
  this.tools = tools;
  console.log('we are initializing everything at TabTitle');

  /**
   * Update tab title in the frame
   * @param {Object} tab
   *    The active tab whose title is posted to the frame.
   */
  this.updateTitle = (tab) => {
    console.log('updateTitle working...!! ' + tab.title);
    this.tools.tabTitle.postMessage(tab.title, this.tools.tabTitle.url);
  }

  // Tab activate and deactivate listener to properly update tab title 
  // in frame.
  tabs.on('activate', (tab) => {
    console.log('tabTitle found activation');
    this.tools.tabTitle.postMessage(tab.title, this.tools.tabTitle.url);
    tab.on('ready', this.updateTitle);
  });

  tabs.on('deactivate', (tab) => {
    console.log('tabTitle found deactivation');
    tab.removeListener('ready', this.updateTitle);
  });
}

module.exports = TabTitle;
