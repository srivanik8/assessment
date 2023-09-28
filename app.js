// Initialize Firebase with your Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://assignment-38238-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const db = getDatabase(app);

// Get DOM elements
const firstNameInput = document.getElementById('firstNameInput');
const lastNameInput = document.getElementById('lastNameInput');
const graduationYearInput = document.getElementById('graduationYearInput');
const dobInput = document.getElementById('dobInput');
const phoneInput = document.getElementById('phoneInput');
const emailInput = document.getElementById('emailInput');
const skillsInput = document.getElementById('skillsInput');
const experienceInput = document.getElementById('experienceInput');
const descriptionInput = document.getElementById('descriptionInput');
const sendButton = document.getElementById('sendButton');
const userDetailsDiv = document.getElementById('userDetails');

// Event listener for sending user details
sendButton.addEventListener('click', () => {
    const userDetails = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        graduationYear: graduationYearInput.value,
        dob: dobInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
        skills: skillsInput.value,
        experience: experienceInput.value,
        description: descriptionInput.value
    };

    // Add the user details to Firebase
    const usersRef = ref(db, 'users'); // Reference to the 'users' node in the database
    push(usersRef, userDetails)
    .then(() => {

        alert('User details added successfully!');
        // Clear the input fields
        firstNameInput.value = '';
        lastNameInput.value = '';
        graduationYearInput.value = '';
        dobInput.value = '';
        phoneInput.value = '';
        emailInput.value = '';
        skillsInput.value = '';
        experienceInput.value = '';
        descriptionInput.value = '';


        
    })
    .catch(error => {
        console.error("Error adding user details to Firebase: ", error);
    });
});





// Function to fetch user details from Firebase using REST API
function fetchUserDetails() {
    fetch(`${appSettings.databaseURL}/users.json`)
        .then(response => response.json())
        .then(data => {
            userDetailsDiv.innerHTML = ''; // Clear previous user details
            const userDetailsGrid = document.createElement('div');
            userDetailsGrid.classList.add('user-details');
            for (const key in data) {
                const user = data[key];
                const userCard = document.createElement('div');
                userCard.classList.add('user-card');
                userCard.innerHTML = `
                    <p><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
                    <p><strong>Graduation Year:</strong> ${user.graduationYear}</p>
                    <p><strong>Date of Birth:</strong> ${user.dob}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Skills:</strong> ${user.skills}</p>
                    <p><strong>Experience:</strong> ${user.experience} years</p>
                    <p><strong>Description:</strong> ${user.description}</p>
                `;
                userDetailsGrid.appendChild(userCard);
            }
            userDetailsDiv.appendChild(userDetailsGrid);
        })
        .catch(error => {
            console.error("Error fetching user details: ", error);
        });
}
// Fetch user details initially and set up a periodic fetch (e.g., every 5 seconds)
fetchUserDetails();
setInterval(fetchUserDetails, 1000); // Fetch every 5 seconds
