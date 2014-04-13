let tabs = require('sdk/tabs');
let TabSwitch = require('./tabSwitch');

let ts = new TabSwitch();

exports['test tab count'] = function(assert, done) {
  tabs.open('about:blank');
  console.log('tab count: ' + ts.getTabCount());
  assert.ok(ts.getTabCount() == 2, 'Tab count works');

  tabs.activeTab.close(done);
  console.log('tab count: ' + ts.getTabCount());
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

require('sdk/test').run(exports);
