import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA0LWvg7JO6dcQcXTGF5imH2WErlq7Y9c",
  authDomain: "rural-connect-7958b.firebaseapp.com",
  projectId: "rural-connect-7958b",
  storageBucket: "rural-connect-7958b.firebasestorage.app",
  messagingSenderId: "259794734390",
  appId: "1:259794734390:web:c8873be10acaa1ae6df797",
  measurementId: "G-0DHM9PJ517"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Initialize authentication
const db = getFirestore(app);  // Initialize Firestore
const analytics = getAnalytics(app);  // Initialize analytics

document.getElementById("r_form").addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;
    const phone_number = document.getElementById('phone_number').value;
    const location = document.getElementById('location').value;
    const role = document.getElementById('role').value;

    try {
        if (password === confirm_password) {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Saving user details in Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                phone: phone_number,
                role: role,
                location: location
            });

            alert("Registration Successful!");
            window.location.href = "login.html";  // Redirect to login page
        } else {
            alert("Passwords do not match!");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
});


document.getElementById('login').addEventListener('click',()=>{
    window.location.href="login.html"
})