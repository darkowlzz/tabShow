let tabs = require('sdk/tabs');
const time = require('sdk/timers');

// TabSwitch class with functionalities to manipulate tabs.
function TabSwitch () {
  // To store reference to the timer.
  this.timer = null;

  // Switch to previous tab.
  this.previous = () => {
    tabs[this.getPreviousTabIndex()].activate()
  }

  // Switch to next tab.
  this.next = () => {
    tabs[this.getNextTabIndex()].activate();
  }

  // Switch to next tab at a given time.
  this.play = () => {
    this.next();
    this.timer = time.setTimeout(this.play, 2000);
  }

  // Clear the timer.
  this.timeout = () => {
    time.clearTimeout(this.timer);
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
}

module.exports = TabSwitch;
