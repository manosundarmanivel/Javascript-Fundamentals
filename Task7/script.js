function sendMessage() {
    const inputField = document.getElementById("userInput");
    const messageText = inputField.value.trim();
    if (messageText === "") return;

    addMessage(messageText, "user");
    inputField.value = "";

 
    setTimeout(() => {
        const botMessages = [
            "Hello! How can I help?",
            "That's interesting!",
            "Tell me more!",
            "I'm here to chat!",
            "Nice talking to you!"
        ];
        const botReply = botMessages[Math.floor(Math.random() * botMessages.length)];
        addMessage(botReply, "bot");
    }, 1000);
}

function addMessage(text, sender) {
    const chatBox = document.getElementById("chatBox");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.innerHTML = text + `<div class="timestamp">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>`;
    chatBox.appendChild(messageElement);


    chatBox.scrollTop = chatBox.scrollHeight;
}
