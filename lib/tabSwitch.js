let tabs = require('sdk/tabs');
const time = require('sdk/timers');

function tabSwitch () {
  this.timer = 5;
  console.log('tabSwitch object created');
}

tabSwitch.prototype.previous = function() {
  if (tabs.activeTab.index == 0) {
    tabs[tabs.length - 1].activate();
  }
  else {
    let prevIndex = tabs.activeTab.index - 1;
    tabs[prevIndex].activate();
  }
}

tabSwitch.prototype.next = function() {
  if (tabs.activeTab.index == (tabs.length - 1)) {
    tabs[0].activate();
  }
  else {
    let nextIndex = tabs.activeTab.index + 1;
    tabs[nextIndex].activate();
  }
}

tabSwitch.prototype.play = function() {
  let that = this;
  that.next();
  this.timer = time.setTimeout(this.play, 2000);
}

tabSwitch.prototype.timeout = function() {
  time.clearTimeout(this.timer);
}

module.exports = tabSwitch;
