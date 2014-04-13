let tabs = require('sdk/tabs');
const time = require('sdk/timers');

// TabSwitch class with functionalities to manipulate tabs.
function TabSwitch () {
  this.timer = null;

  // Switch to previous tab.
  // If the activeTab is the first tab, switch to the last tab.
  // Else swith to the previous tab.
  this.previous = () => {
    if (tabs.activeTab.index == 0) {
      tabs[tabs.length - 1].activate();
    }
    else {
      let prevIndex = tabs.activeTab.index - 1;
      tabs[prevIndex].activate();
    }
  }

  // Switch to next tab.
  // If the activeTab is the last tab, switch to the first tab.
  // Else switch to the next tab.
  this.next = () => {
    if (tabs.activeTab.index == (tabs.length - 1)) {
      tabs[0].activate();
    }
    else {
      let nextIndex = tabs.activeTab.index + 1;
      tabs[nextIndex].activate();
    }
  }

  // Switch to next tab at a given time.
  this.play = () => {
    this.next();
    this.timer = time.setTimeout(this.play, 2000);
  }

  // Clear the timer
  this.timeout = () => {
    time.clearTimeout(this.timer);
  }
}

module.exports = TabSwitch;
