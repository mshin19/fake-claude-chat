export function displayChat(chat) {
  const messages = document.querySelector('#messages');
  const html = chat
    .map(
      (message) => `<p><strong>${message.role}:</strong> ${message.text}</p>`
    )
    .join('');
  messages.innerHTML = html;
}
