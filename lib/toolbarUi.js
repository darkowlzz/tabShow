const ui = require('sdk/ui');
const data = require('sdk/self').data;

let tabSwitch = require('./tabSwitch');

function toolbarUi() {
  this.ts = new tabSwitch();
}

toolbarUi.prototype.previous = ui.ActionButton({
  id: 'previous',
  label: 'previous',
  icon: data.url('previous.png'),
  onClick: function(state) {
    this.ts.previous();
  }
});

toolbarUi.prototype.next = ui.ActionButton({
  id: 'next',
  label: 'next',
  icon: data.url('next.png'),
  onClick: function(state) {
    this.ts.next();
  }
});

toolbarUi.prototype.play = ui.ToggleButton({
  id: 'play',
  label: 'play',
  icon: data.url('play.png'),
  onChange: function(state) {
    if (state.checked) {
      this.ts.play();
    }
    else {
      this.ts.timeout();
    }
  }
});

module.exports = toolbarUi;
