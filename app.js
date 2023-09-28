import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://assignment-38238-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const db = getDatabase(app)

// Get DOM elements
const messageInput = document.getElementById('messageInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const messagesDiv = document.getElementById('messages');

// Event listener for sending a message
sendMessageBtn.addEventListener('click', () => {
    const messageText = messageInput.value;

    // Add the message to Firebase
    const messagesRef = ref(db, 'messages'); // Reference to the 'messages' node in the database
    push(messagesRef, {
        message: messageText
    })
    .then(() => {
        // Clear the input field
        messageInput.value = '';
    })
    .catch(error => {
        console.error("Error adding message to Firebase: ", error);
    });
});

// Function to fetch messages from Firebase in real-time
function fetchMessages() {
    const messagesRef = ref(db, 'messages'); // Reference to the 'messages' node in the database

    // Listen for changes in real-time
    onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            messagesDiv.innerHTML = ''; // Clear previous messages
            for (const key in data) {
                const message = data[key].message;
                const messageElement = document.createElement('p');
                messageElement.textContent = message;
                messagesDiv.appendChild(messageElement);
            }
        }
    }, (error) => {
        console.error("Error fetching messages: ", error);
    });
}

// Fetch messages initially and set up real-time listener
fetchMessages();
