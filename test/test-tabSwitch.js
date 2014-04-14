let tabs = require('sdk/tabs');
let TabSwitch = require('./tabSwitch');

let ts = new TabSwitch();

function openTabs(count, background) {
  for (let i = 0; i < count; i++) {
    tabs.open({
      url: 'about:blank',
      inBackground: background
    });
  }
}

function closeTabs(count, callback) {
  for (let i = 0; i < count; i++) {
    tabs.activeTab.close(callback);
  }
}

function tabActivate(index) {
  console.log('tab index before: ' + tabs.activeTab.index);
  tabs[index].activate();
  console.log('tab index after: ' + tabs.activeTab.index);
}

exports['test tab count'] = function(assert, done) {
  tabs.open('about:blank');
  assert.ok(ts.getTabCount() == 2, 'Tab count works');

  tabs.activeTab.close(done);
}

exports['test active tab'] = function(assert) {
  let active = tabs.activeTab;
  assert.ok(ts.getActiveTab() == active, 'Get Active Tab works');
}

exports['test previous tab index'] = function(assert, done) {
  tabs.open('about:blank');
  assert.ok(ts.getPreviousTabIndex() == 0, 'Correct previous tab index');

  tabs.activeTab.close(done);
}

exports['test previous tab to first'] = function(assert, done) {
  openTabs(4, true);
  assert.ok(ts.getPreviousTabIndex() == (ts.getTabCount() - 1),
            'Correct previous tab to first');
  closeTabs(4, done);
}

exports['test next tab index to end'] = function(assert, done) {
  openTabs(4, false);
  assert.ok(ts.getNextTabIndex() == 0, 'Correct next tab index at end');
  closeTabs(4, done);
}

require('sdk/test').run(exports);
