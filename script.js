// Function to add a message to the chat container
function addMessage(message, isUser) {
    var chatMessages = document.getElementById("chat-messages");
    var newMessage = document.createElement("div");
    newMessage.className = isUser ? "user-message" : "assistant-message";
    newMessage.textContent = message;
    chatMessages.appendChild(newMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listener for send button click
document.getElementById("send-button").addEventListener("click", function() {
    var userInput = document.getElementById("user-input");
    var userMessage = userInput.value;
    if (userMessage !== "") {
        addMessage(userMessage, true);
        userInput.value = "";

        // Make an AJAX request to the server
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/process_message", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        // Send user message to the server
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                var assistantMessage = response.message;
                addMessage(assistantMessage, false);
            }
        };

        var data = JSON.stringify({ message: userMessage });
        xhr.send(data);
    }
});
