let tabs = require('sdk/tabs');
const Time = require('sdk/timers');
const sp = require('sdk/simple-prefs');
const { Cc, Ci } = require('chrome');


// TabSwitch class with functionalities to manipulate tabs.
function TabSwitch () {
  // To store reference to the timer.
  this.timer = null;
  this.time = sp.prefs['timer'];

  this.wm = Cc['@mozilla.org/appshell/window-mediator;1']
            .getService(Ci.nsIWindowMediator);

  this.getTabbrowser = () => {
    let mainWindow = this.wm.getMostRecentWindow('navigator:browser');
    return mainWindow.gBrowser;
  }

  // Switch to previous tab.
  this.previous = () => {
    let tabbrowser = this.getTabbrowser();
    tabbrowser.tabContainer.advanceSelectedTab(-1, true);
  }

  // Switch to next tab.
  this.next = () => {
    console.log('nexting...');
    let tabbrowser = this.getTabbrowser();
    tabbrowser.tabContainer.advanceSelectedTab(1, true);
  }

  // Switch to next tab at a given time.
  this.play = () => {
    if (sp.prefs['direction'] == 'right') {
      this.next();
    }
    else if (sp.prefs['direction'] == 'left') {
      this.previous();
    }
    this.timer = Time.setTimeout(this.play, this.time * 1000);
  }

  // Clear the timer.
  this.timeout = () => {
    Time.clearTimeout(this.timer);
  }

  this.getActiveTab = () => {
    return tabs.activeTab;
  }

  this.getTabCount = () => {
    return tabs.length;
  }

  this.getPreviousTabIndex = () => {
    if (tabs.activeTab.index == 0) {
      return (tabs.length - 1);
    }
    else {
      return (tabs.activeTab.index - 1);
    }
  }

  this.getNextTabIndex = () => {
    if (tabs.activeTab.index == (tabs.length - 1)) {
      return 0;
    }
    else {
      return (tabs.activeTab.index + 1);
    }
  }

  this.activateTab = (index) => {
    tabs[index].activate();
  }

  this.setTime = () => {
    if (sp.prefs['timer'] == 0) {
      sp.prefs['timer'] = 1;
    }
    Time.clearTimeout(this.timer);
    this.time = sp.prefs['timer'];
  }

  sp.on('timer', this.setTime);
}

module.exports = TabSwitch;
