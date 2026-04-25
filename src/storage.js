import { displayChat } from './ui.js';

export function saveToLocalStorage(chat) {
  localStorage.setItem('chat', JSON.stringify(chat));
}

export function restoreFromLocalStorage(chat) {
  const lsItems = JSON.parse(localStorage.getItem('chat'));
  if (lsItems && lsItems.length) {
    chat.push(...lsItems);
    displayChat(chat);
  }
}
