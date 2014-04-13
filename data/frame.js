window.addEventListener('message', updateTabIndex, false);

function updateTabIndex(message) {
  console.log('data received: ' + message.data);
  var count = document.getElementById('count');
  count.textContent = message.data;
}
