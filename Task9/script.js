const content = document.getElementById("content");
const loading = document.getElementById("loading");

let page = 1;
const limit = 5; 
const apiURL = "https://jsonplaceholder.typicode.com/posts";

async function fetchPosts() {
    loading.style.display = "block";

    try {
        const response = await fetch(`${apiURL}?_limit=${limit}&_page=${page}`);
        const data = await response.json();
        
        data.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
            content.appendChild(postElement);
        });

        page++; 
    } catch (error) {
        console.error("Error loading posts:", error);
    } finally {
        loading.style.display = "none";
    }
}


window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        fetchPosts();
    }
});


fetchPosts();
