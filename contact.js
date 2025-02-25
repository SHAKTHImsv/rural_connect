import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";  // Import 'push' from firebase-database

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA0LWvg7JO6dcQcXTGF5imH2WErlq7Y9c",
  authDomain: "rural-connect-7958b.firebaseapp.com",
  projectId: "rural-connect-7958b",
  storageBucket: "rural-connect-7958b.firebasestorage.app",
  messagingSenderId: "259794734390",
  appId: "1:259794734390:web:c8873be10acaa1ae6df797",
  measurementId: "G-0DHM9PJ517"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Form submission handler
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {
  event.preventDefault();  // Prevent form from reloading the page

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Save form data to Firebase
  const contactRef = ref(database, 'contacts');  // Correct use of ref with database
  push(contactRef, {
    name: name,
    email: email,
    message: message,
    timestamp: Date.now()
  })
  .then(() => {
    alert("Your message has been sent!");
    contactForm.reset();  // Clear the form
  })
  .catch((error) => {
    alert("Error sending message: " + error.message);
  });
});
