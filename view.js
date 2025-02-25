import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

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

// Function to fetch and display issues based on selected filters (location, category, and keyword)
function fetchIssues(location, category, keyword) {
    const dbRef = ref(database, 'issues'); // Reference to issues data in the Firebase DB

    // Set up real-time listener
    onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
            const issues = snapshot.val();
            displayIssues(issues, location, category, keyword);
        } else {
            console.log("No data available");
        }
    }, (error) => {
        console.error("Error fetching data:", error);
    });
}

// Function to display issues in a card format
function displayIssues(issues, location, category, keyword) {
    const resultContainer = document.querySelector('.result-container'); // Ensure this container exists
    if (!resultContainer) {
        console.error('result-container not found!');
        return;
    }

    resultContainer.innerHTML = ''; // Clear previous results

    // Loop through the issues and filter based on location, category, and keyword
    for (const issueId in issues) {
        const issue = issues[issueId];

        const matchesLocation = location === 'All Locations' || issue.location.toLowerCase().includes(location.toLowerCase());
        const matchesCategory = category === 'All Category' || issue.category === category;
        const matchesKeyword = !keyword || issue.title.toLowerCase().includes(keyword.toLowerCase()) || issue.description.toLowerCase().includes(keyword.toLowerCase());

        // If all conditions are met, display the issue
        if (matchesLocation && matchesCategory && matchesKeyword) {
            const card = createCard(issue);
            resultContainer.appendChild(card); // Add the card to the container
        }
    }
}

// Function to create an individual issue card with "Read More" functionality and contact details
function createCard(issue) {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h3');
    title.textContent = issue.title;

    const category = document.createElement('p');
    category.innerHTML = `<strong>Category:</strong> ${issue.category}`;

    const location = document.createElement('p');
    location.innerHTML = `<strong>Location:</strong> ${issue.location}`;

    const descriptionContainer = document.createElement('p');
    descriptionContainer.classList.add('description');

    // Create description with "Read More" option
    const descriptionText = document.createElement('span');
    descriptionText.textContent = issue.description;

    // If description is long, truncate it and add a "Read More" link
    const maxLength = 150;
    if (issue.description.length > maxLength) {
        descriptionContainer.textContent = issue.description.substring(0, maxLength) + '... ';
        const readMoreLink = document.createElement('a');
        readMoreLink.classList.add('read-more');
        readMoreLink.textContent = 'Read More';

        // Event listener to toggle full description and "Read More"/"Read Less"
        readMoreLink.addEventListener('click', function () {
            // Toggle description between full and truncated versions
            if (descriptionContainer.textContent === issue.description.substring(0, maxLength) + '... ') {
                descriptionContainer.textContent = issue.description; // Show full description
                readMoreLink.textContent = 'Read Less'; // Change link text to "Read Less"
            } else {
                descriptionContainer.textContent = issue.description.substring(0, maxLength) + '... '; // Truncate
                readMoreLink.textContent = 'Read More'; // Change link text back to "Read More"
            }
        });

        // Append the "Read More" link after truncated description
        descriptionContainer.appendChild(readMoreLink);
    } else {
        // If the description is short, just display it
        descriptionContainer.textContent = issue.description;
    }

    // Adding contact details
    const contactDetails = document.createElement('p');
    contactDetails.innerHTML = `<strong>Contact:</strong> ${issue.contact || "Not provided"}`; // Use issue.contact or fallback to "Not provided"

    // Append all elements to the card
    card.appendChild(title);
    card.appendChild(category);
    card.appendChild(location);
    card.appendChild(descriptionContainer);
    card.appendChild(contactDetails);

    return card;
}

// Listen for filter changes (from your input fields and dropdown menus)
document.querySelector('.searchBtn').addEventListener('click', (e) => {
    const location = document.querySelector('#locationInput').value.trim(); // Get location from the input field
    const category = document.querySelector('#categorySelect').value; // Get category from the select dropdown
    const keyword = document.querySelector('#keywordInput').value.trim(); // Get keyword from the search input field
    fetchIssues(location, category, keyword);
});

// Initial fetch on page load (with default filters)
fetchIssues('All Locations', 'All Category', '');
