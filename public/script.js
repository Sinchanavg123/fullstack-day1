// Get HTML Elements
const form = document.getElementById("blogForm");
const title = document.getElementById("title");
const author = document.getElementById("author");
const content = document.getElementById("content");

const titleError = document.getElementById("titleError");
const authorError = document.getElementById("authorError");
const contentError = document.getElementById("contentError");

const blogContainer = document.getElementById("blogContainer");

// Form Submit Event
form.addEventListener("submit", function (e) {

    e.preventDefault();

    let valid = true;

    // Clear previous error messages
    titleError.textContent = "";
    authorError.textContent = "";
    contentError.textContent = "";

    title.classList.remove("error");
    author.classList.remove("error");
    content.classList.remove("error");

    // Validation
    if (title.value.trim() === "") {
        titleError.textContent = "Title is required";
        title.classList.add("error");
        valid = false;
    }

    if (author.value.trim() === "") {
        authorError.textContent = "Author name is required";
        author.classList.add("error");
        valid = false;
    }

    if (content.value.trim().length < 20) {
        contentError.textContent = "Content should be at least 20 characters";
        content.classList.add("error");
        valid = false;
    }

    // If validation passes
    if (valid) {

        fetch("/api/blogs", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: title.value,
                author: author.value,
                content: content.value
            })

        })
        .then(response => response.json())
        .then(data => {

            alert(data.message);

            form.reset();

            loadBlogs();

        })
        .catch(error => {
            console.error("Error:", error);
        });

    }

});

// Load Blogs Function
function loadBlogs() {

    fetch("/api/blogs")

        .then(response => response.json())

        .then(data => {

            blogContainer.innerHTML = "";

            data.forEach(blog => {

                const card = document.createElement("div");

                card.className = "card";

                card.innerHTML = `
                    <h3>${blog.title}</h3>
                    <p><strong>Author:</strong> ${blog.author}</p>
                    <p>${blog.content}</p>
                `;

                blogContainer.prepend(card);

            });

        })

        .catch(error => {
            console.error("Error loading blogs:", error);
        });

}

// Load blogs when page opens
loadBlogs();