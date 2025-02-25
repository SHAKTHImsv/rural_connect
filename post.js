import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-storage.js"; // Import firebase storage

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
const storage = getStorage(app); // Correct storage initialization

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("post_form").addEventListener('submit', (e) => {
        e.preventDefault();

        const category = document.getElementById("category").value;
        const desc = document.getElementById("Description_value").value;
        const location = document.getElementById("Location").value;
        const contact = document.getElementById('contact').value;
        const image = document.getElementById('Image').files[0]; // Correct ID for the image file input

        // Get the current date and time for the entry
        const timestamp = new Date().toISOString();

        // Create a reference to the 'issues' node in your Firebase Realtime Database
        const issuesRef = ref(database, 'issues');

        // Push a new post to the 'issues' node
        const newPostRef = push(issuesRef); // 'push()' creates a new child with a unique ID

        // Create an object with the form data
        const issueData = {
            category: category,
            description: desc,
            location: location,
            contact: contact,
            timestamp: timestamp
        };

        // Set the new post data at the newly created reference
        set(newPostRef, issueData)
            .then(() => {
                alert('Your issue has been posted!');
                document.getElementById("post_form").reset(); // Reset the form after submission
            })
            .catch((error) => {
                alert('Error posting issue: ' + error.message);
            });

        if (!image) { // Fix the check for image file
            alert('Please select an image file');
            return; // Exit early if no image is selected
        }

        const imageStorageRef = storageRef(storage, 'images/' + image.name); // Correct path for storage reference

        const uploadTask = uploadBytesResumable(imageStorageRef, image);

        // Monitor the upload progress
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                alert('Error uploading image: ' + error.message);
            },
            () => {
                // Get the download URL once upload is complete
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    // You can now store this download URL along with the issue data in the database if needed
                });
            }
        );
    });
});
