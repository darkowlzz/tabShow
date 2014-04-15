window.addEventListener('message', updateTabTitle, false);

function updateTabTitle(message) {
  console.log('data received: ' + message.data);
  var title = document.getElementById('title');
  title.textContent = message.data;
}
