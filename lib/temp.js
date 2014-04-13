const ui = require('sdk/ui');

//const { ActionButton } = require('sdk/ui/button/action');
//const { Toolbar } = require('sdk/ui/toolbar');
const time = require('sdk/timers');
const data = require('sdk/self').data;
let tabs = require('sdk/tabs');

let timer = {};
let tabStack = [];

tabs.on('activate', function() {
  console.log('new active ' + tabs.activeTab.index);
  frame.postMessage(tabs.activeTab.index, frame.url);
});

function prev() {
  if (tabs.activeTab.index == 0) {
    tabs[tabs.length - 1].activate();
  }
  else {
    let prevIndex = tabs.activeTab.index - 1;
    tabs[prevIndex].activate();
  }
}

function fwd() {
  console.log('fwd: current index is '+ tabs.activeTab.index);
  if (tabs.activeTab.index == (tabs.length - 1)) {
    console.log('returning to 0');
    tabs[0].activate();
  }
  else {
    let nextIndex = tabs.activeTab.index + 1;
    console.log('next index: ' + nextIndex);
    tabs[nextIndex].activate();
  }
}

function ply() {
  console.log('playing...');
  fwd();
  timer = time.setTimeout(ply, 2000);
}

let previous = ui.ActionButton({
  id: 'previous',
  label: 'previous',
  icon: data.url('back.png'),
  onClick: function(state) {
    console.log('previous');
    prev();
  }
});

let play = ui.ToggleButton({
  id: 'play',
  label: 'play',
  icon: data.url('play.png'),
  onChange: function(state) {
    if (state.checked) {
      console.log('play');
      ply();
    }
    else {
      console.log('clearing timer');
      time.clearTimeout(timer);
    }
  }
});

let next = ui.ActionButton({
  id: 'next',
  label: 'next',
  icon: data.url('fwd.png'),
  onClick: function(state) {
    console.log('next');
    fwd();
  }
});

let frame = ui.Frame({
  url: data.url('frame.html')
});

let push = ui.ToggleButton({
  id: 'add',
  label: 'add',
  icon: data.url('add.png'),
  onChange: function(state) {
    if (state.checked) {
      button.state('tab', {
        checked: true
      });
      console.log('adding...');
      tabStack.push(tabs.activeTab);
      //console.log(JSON.stringify(tabStack));
    }
    else {
      let t = tabs.activeTab;
      let i = tabStack.indexOf(t);
      console.log('found at ' + i);
      tabStack.splice(i, 1);
      //console.log(JSON.stringify(tabStack));
    }
  }
});

var toolbar = ui.Toolbar({
  title: "Tab-show",
  items: [previous, play, next, frame, push]
});
