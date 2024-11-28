document.getElementById('chat-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const userInput = document.getElementById('user-input').value;
  displayMessage('You', userInput);
  document.getElementById('user-input').value = '';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userInput }),
    });
    const data = await response.json();
    displayMessage('ChatGPT', data.reply);
  } catch (error) {
    console.error('Error:', error);
    displayMessage('ChatGPT', 'Sorry, an error occurred.');
  }
});

function displayMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender.toLowerCase());
  messageDiv.textContent = `${sender}: ${text}`;
  document.getElementById('messages').appendChild(messageDiv);
}
