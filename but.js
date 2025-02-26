document.getElementById("postsI").addEventListener("click", () => {
    // Hide all sections first
    hideAllSections();

    // Show the "Post an Issue" section
    const post = document.querySelector(".post");
    post.style.display = "block";
});

document.getElementById("viewsI").addEventListener('click', () => {
    // Hide all sections first
    hideAllSections();

    // Show the "View an Issue" section
    const view = document.querySelector(".view");
    view.style.display = "block";
});

document.getElementById("pIs").addEventListener('click', () => {
    // Show the "Post an Issue" section (in About Us page)
    hideAllSections();
    const post = document.querySelector(".post");
    post.style.display = "block";
});

document.getElementById("vIs").addEventListener('click', () => {
    // Show the "View an Issue" section (in About Us page)
    hideAllSections();
    const view = document.querySelector(".view");
    view.style.display = "block";
});

function hideAllSections() {
    const home = document.querySelector(".home");
    const post = document.querySelector(".post");
    const view = document.querySelector(".view");
    const about = document.querySelector(".about");
    const contact = document.querySelector(".contact");
    const profile = document.querySelector(".profile");

    // Hide all sections
    home.style.display = "none";
    post.style.display = "none";
    view.style.display = "none";
    about.style.display = "none";
    contact.style.display = "none";
    profile.style.display = "none";
}

