// Get Elements
const form = document.getElementById("blogForm");
const title = document.getElementById("title");
const author = document.getElementById("author");
const content = document.getElementById("content");

const titleError = document.getElementById("titleError");
const authorError = document.getElementById("authorError");
const contentError = document.getElementById("contentError");

const blogContainer = document.getElementById("blogContainer");

// Submit Form
form.addEventListener("submit", function (e) {

    e.preventDefault();

    titleError.textContent = "";
    authorError.textContent = "";
    contentError.textContent = "";

    let valid = true;

    if (title.value.trim() === "") {
        titleError.textContent = "Title is required";
        valid = false;
    }

    if (author.value.trim() === "") {
        authorError.textContent = "Author is required";
        valid = false;
    }

    if (content.value.trim().length < 20) {
        contentError.textContent = "Content must be at least 20 characters";
        valid = false;
    }

    if (!valid) return;

    const blog = {
        title: title.value,
        author: author.value,
        content: content.value
    };

    fetch("/api/blogs", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(blog)

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        form.reset();

        loadBlogs();

    })

    .catch(error => console.log(error));

});

// Load Blogs
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
                <h4>By ${blog.author}</h4>
                <p>${blog.content}</p>
            `;

            blogContainer.prepend(card);

        });

    });

}

loadBlogs();