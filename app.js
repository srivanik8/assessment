// Initialize Firebase with your Firebase configuration (same as Step 4 in the previous answer)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase  , ref , push , onValue , remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"




const appSettings = {
    databaseURL: "https://assignment-38238-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const db = getDatabase(app)


// Get a reference to the Firebase database

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

const databaseURL = "https://assignment-38238-default-rtdb.firebaseio.com/";

// Function to fetch messages from Firebase using REST API
function fetchMessages() {
    fetch(`${databaseURL}/messages.json`)
        .then(response => response.json())
        .then(data => {
            messagesDiv.innerHTML = ''; // Clear previous messages
            for (const key in data) {
                const message = data[key].message;
                const messageElement = document.createElement('p');
                messageElement.textContent = message;
                messagesDiv.appendChild(messageElement);
            }
        })
        .catch(error => {
            console.error("Error fetching messages: ", error);
        });
}

// Fetch messages initially and set up a periodic fetch (e.g., every 5 seconds)
fetchMessages();
setInterval(fetchMessages, 1000);
