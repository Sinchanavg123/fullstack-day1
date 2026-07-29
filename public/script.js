// Get Elements
// ===============================
// Get HTML Elements
// ===============================
const form = document.getElementById("blogForm");
const blogId = document.getElementById("blogId");

const title = document.getElementById("title");
const author = document.getElementById("author");
const content = document.getElementById("content");

const titleError = document.getElementById("titleError");
const authorError = document.getElementById("authorError");
const contentError = document.getElementById("contentError");

const blogContainer = document.getElementById("blogContainer");

// ===============================
// Submit Form (Add / Update)
// ===============================
form.addEventListener("submit", function (e) {

    e.preventDefault();

    // Clear previous errors
    titleError.textContent = "";
    authorError.textContent = "";
    contentError.textContent = "";

    let valid = true;

    // Validation
    if (title.value.trim() === "") {
        titleError.textContent = "Title is required";
        valid = false;
    }

    if (author.value.trim() === "") {
        authorError.textContent = "Author name is required";
        valid = false;
    }

    if (content.value.trim().length < 20) {
        contentError.textContent =
            "Content should be at least 20 characters";
        valid = false;
    }

    if (!valid) return;

    const blog = {
        title: title.value,
        author: author.value,
        content: content.value
    };

    // Default values for Add
    let url = "/api/blogs";
    let method = "POST";

    // If editing
    if (blogId.value !== "") {
        url = `/api/blogs/${blogId.value}`;
        method = "PUT";
    }

    fetch(url, {

        method: method,

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(blog)

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        form.reset();

        // Clear hidden id
        blogId.value = "";

        loadBlogs();

    })

    .catch(error => console.error(error));

});

// ===============================
// Load All Blogs
// ===============================
function loadBlogs() {

    fetch("/api/blogs")

    .then(response => response.json())

    .then(blogs => {

        blogContainer.innerHTML = "";

        if (blogs.length === 0) {

            blogContainer.innerHTML = `
                <div class="card">
                    <h3>No Blogs Available</h3>
                    <p>Create your first blog.</p>
                </div>
            `;

            return;
        }

        blogs.forEach(blog => {

            const card = document.createElement("div");

            card.className = "card";

            card.innerHTML = `

                <h3>${blog.title}</h3>

                <h4>By ${blog.author}</h4>

                <p>${blog.content}</p>

                <button
                    class="edit-btn"
                    onclick="editBlog(${blog.id})">
                    Edit
                </button>

            `;

            blogContainer.prepend(card);

        });

    })

    .catch(error => console.error(error));

}

// ===============================
// Edit Blog
// ===============================
function editBlog(id) {

    fetch("/api/blogs")

    .then(response => response.json())

    .then(blogs => {

        const blog = blogs.find(item => item.id === id);

        if (!blog) {
            alert("Blog not found");
            return;
        }

        blogId.value = blog.id;

        title.value = blog.title;

        author.value = blog.author;

        content.value = blog.content;

        // Scroll to form
        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

// ===============================
// Initial Load
// ===============================
loadBlogs();