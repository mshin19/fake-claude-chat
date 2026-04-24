import wait from 'waait';

const userInput = document.querySelector('#userInput');
const sendButton = document.querySelector('#sendBtn');
const clearButton = document.querySelector('#clearBtn');

const messages = document.querySelector('#messages');

const chat = [];

async function handleSend(event) {
  //listen to click or Enter
  if (event.type === 'click' || event.key === 'Enter') {
    const userMessage = userInput.value;
    if (!userMessage) return;
    //1. Push user message and display immediately
    const userChat = {
      role: 'user',
      text: userMessage,
      id: Date.now(),
    };
    chat.push(userChat);
    displayChat();
    //2. Clear the input
    userInput.value = '';
    //3. Show thinking indicator
    const indicator = document.createElement('p');
    indicator.textContent = 'Claude is thinking...';
    indicator.id = 'indicator';
    messages.appendChild(indicator);
    //4. Wait 1 second
    await wait(1000);
    //5. Fetch fake response
    const fakeMessage = await fetchResponse();
    const fakeChat = {
      role: 'assistant',
      text: fakeMessage,
      id: Date.now(),
    };
    chat.push(fakeChat);
    document.querySelector('#indicator').remove();
    displayChat();
  }
}

function displayChat() {
  const html = chat
    .map(
      (message) => `<p><strong>${message.role}:</strong> ${message.text}</p>`
    )
    .join('');
  messages.innerHTML = html;
}

async function fetchResponse() {
  const response = await fetch('https://icanhazdadjoke.com', {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  return data.joke;
}

sendButton.addEventListener('click', handleSend);
sendButton.addEventListener('keyup', handleSend);

//What app needs to do:
//1. User types a message and hits Send or Enter
//2. Message appears in the chat immediately
//3. A typing indicator appears ("Claude is thinking...")
//4. After a 1 second delay, a fake response appears
//5. Conversation persists in localStorage - refreshing the page restores the history
//5.1 Saving - every time chat array changes (after displayChat()), save it to localStorage
//5.2 Loading - on page load, check if anything is in localStorage and restore it to chat before displaying
//6. A Clear button wipes the conversation from the screen and localStorage
//6.1 Clearing - remove from localStorage AND clear the chat array AND clear the screen.

//To-Do list
//fake response function with waait
//function that renders a message to the #messages div
//function that saves the conversation to localStorage
//function that loads the conversation from localStorage on page load
//the send button click handler
//The clear button handler

//Create element .createElement('p');

//Insert it in document .insertAdjacentElement('beforebegin', heading);

//put userInput in document .textContent = userInput;
