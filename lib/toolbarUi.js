const ui = require('sdk/ui');
const data = require('sdk/self').data;

let TabSwitch = require('./tabSwitch');

//  ToolbarUi class consisting of the toolbar ui components.
function ToolbarUi() {
  // Create a TabSwitch object.
  this.ts = new TabSwitch();

  // Map the TabSwitch methods to the appropriate events on toolbar elements.
  this.previous.on('click', this.ts.previous.bind(this.ts));
  this.next.on('click', this.ts.next.bind(this.ts));
  this.play.on('change', state => {
    if (state.checked) {
      this.ts.play();
    }
    else {
      this.ts.timeout();
    }
  });
}

// Previous action button.
ToolbarUi.prototype.previous = ui.ActionButton({
  id: 'previous',
  label: 'previous',
  icon: data.url('previous.png')
});

// Next action button.
ToolbarUi.prototype.next = ui.ActionButton({
  id: 'next',
  label: 'next',
  icon: data.url('next.png')
});

// Play toggle button.
ToolbarUi.prototype.play = ui.ToggleButton({
  id: 'play',
  label: 'play',
  icon: data.url('play.png')
});

module.exports = ToolbarUi;
