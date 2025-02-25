import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";


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

document.getElementById("login").addEventListener('submit', async (e) => {
    e.preventDefault();

    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        alert("Sign In Successful!");
        window.location.href = "home.html"; 
    } catch (error) {
        
        alert("Error: " + error.message);
    }
});



document.getElementById("register").addEventListener('click',()=>{
    window.location.href="form.html";
})