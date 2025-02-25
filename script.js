const home = document.querySelector(".home");
const post = document.querySelector(".post");
const view = document.querySelector(".view");
const about = document.querySelector(".about");
const contact = document.querySelector(".contact");

document.getElementById("postAnIssue").addEventListener('click', () => {
    home.style.display = "none";
    post.style.display = "block";
    view.style.display = "none";
    about.style.display = "none";
    contact.style.display = "none";
});
document.getElementById("homeEle").addEventListener('click', () => {
    post.style.display = "none";
    home.style.display = "block";
    view.style.display = "none";
    about.style.display = "none";
    contact.style.display = "none";
});
document.getElementById("viewAnIssue").addEventListener('click', () => {
    home.style.display = "none";
    post.style.display = "none";
    view.style.display = "block";
    about.style.display = "none"
    contact.style.display = "none";
});
document.getElementById("aboutUs").addEventListener('click', () => {
    home.style.display = "none";
    post.style.display = "none";
    view.style.display = "none";
    about.style.display = "block";
    contact.style.display = "none";
});
document.getElementById("contactUs").addEventListener('click', () => {
    home.style.display = "none";
    post.style.display = "none";
    view.style.display = "none";
    about.style.display = "none";
    contact.style.display = "block";
});

document.getElementById('post').addEventListener('click', () => {
    home.style.display = "none";
    post.style.display = "block";
    view.style.display = "none";
    about.style.display = "none";
    contact.style.display = "none";
});
document.getElementById('view').addEventListener('click', () => {
    home.style.display = "none";
    post.style.display = "none";
    view.style.display = "block";
    about.style.display = "none";
    contact.style.display = "none";
});

