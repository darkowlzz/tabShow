window.addEventListener('message', updateTabTitle, false);

function updateTabTitle(message) {
  var title = document.getElementById('title');
  title.textContent = message.data;
}
