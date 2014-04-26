let tabs = require('sdk/tabs');
const { Cc, Ci } = require('chrome');

// TabTitle class
function TabTitle (tools) {
  this.tools = tools;
  this.wm = Cc['@mozilla.org/appshell/window-mediator;1']
            .getService(Ci.nsIWindowMediator);
  this.currentTitle = this.wm.getMostRecentWindow('navigator:browser')
                      .gBrowser.contentDocument.title;

  // Update title in toolbar frame.
  this.updateTitle = () => {
    this.tools.tabTitle.postMessage(this.currentTitle, this.tools.tabTitle.url);
  }

  /**
   * Update tab title in the frame
   * @param {Object} tab
   *    The active tab whose title is posted to the frame.
   */
  this.updateCurrentTitle = (tab) => {
    this.currentTitle = tab.title;
    this.updateTitle();
  }

  // Tab activate and deactivate listener to properly update tab title in frame.
  // 'ready' event is being listened to update the tab title when page changes.
  tabs.on('activate', (tab) => {
    this.currentTitle = tab.title;
    this.updateTitle();
    tab.on('ready', this.updateCurrentTitle);
  });

  tabs.on('deactivate', (tab) => {
    tab.removeListener('ready', this.updateTitle);
  });

  this.updateTitle();
}

module.exports = TabTitle;
