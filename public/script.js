// ===========================================
// DEVBLOG - script.js (Phase 5 - Part 1)
// ===========================================

// ---------- Form Elements ----------
const form = document.getElementById("blogForm");
const blogId = document.getElementById("blogId");

const title = document.getElementById("title");
const author = document.getElementById("author");
const category = document.getElementById("category");
const tags = document.getElementById("tags");
const image = document.getElementById("image");
const content = document.getElementById("content");

// ---------- Error Elements ----------
const titleError = document.getElementById("titleError");
const authorError = document.getElementById("authorError");
const categoryError = document.getElementById("categoryError");
const contentError = document.getElementById("contentError");

// ---------- UI Elements ----------
const blogContainer = document.getElementById("blogContainer");
const search = document.getElementById("search");
const filterCategory = document.getElementById("filterCategory");

const previewImage = document.getElementById("previewImage");
const charCount = document.getElementById("charCount");
const readingPreview = document.getElementById("readingPreview");

// ===========================================
// Character Counter
// ===========================================

content.addEventListener("input", () => {

    const text = content.value;

    charCount.textContent = text.length;

    const words = text.trim().split(/\s+/).filter(Boolean).length;

    readingPreview.textContent = Math.max(1, Math.ceil(words / 200));

});

// ===========================================
// Image Preview
// ===========================================

image.addEventListener("input", () => {

    if (image.value.trim() !== "") {

        previewImage.src = image.value;

    } else {

        previewImage.src =
            "https://via.placeholder.com/700x350?text=Image+Preview";

    }

});
<a
href="blog-details.html?id=${blog.id}"
class="btn">

Read More

</a>

// ===========================================
// Validation
// ===========================================

function validateForm() {

    let valid = true;

    titleError.textContent = "";
    authorError.textContent = "";
    categoryError.textContent = "";
    contentError.textContent = "";

    if (title.value.trim() === "") {

        titleError.textContent = "Blog title is required";

        valid = false;

    }

    if (author.value.trim() === "") {

        authorError.textContent = "Author name is required";

        valid = false;

    }

    if (category.value === "") {

        categoryError.textContent = "Please select a category";

        valid = false;

    }

    if (content.value.trim().length < 20) {

        contentError.textContent =
            "Content should contain at least 20 characters.";

        valid = false;

    }

    return valid;

}

// ===========================================
// Toast Notification
// ===========================================

function showToast(message, color = "#16a34a") {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.style.background = color;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}
// ===========================================
// ADD / UPDATE BLOG
// ===========================================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    const blogData = {

        title: title.value.trim(),

        author: author.value.trim(),

        category: category.value,

        tags: tags.value,

        image: image.value,

        content: content.value.trim()

    };

    try {

        let response;

        // UPDATE BLOG

        if (blogId.value !== "") {

            response = await fetch(`/api/blogs/${blogId.value}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(blogData)

            });

        }

        // ADD BLOG

        else {

            response = await fetch("/api/blogs", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(blogData)

            });

        }

        const data = await response.json();

        if (!response.ok) {

            showToast(data.message, "#dc2626");

            return;

        }

        showToast(data.message);

        form.reset();

        blogId.value = "";

        previewImage.src =
            "https://via.placeholder.com/700x350?text=Image+Preview";

        charCount.textContent = "0";

        readingPreview.textContent = "1";

        loadBlogs();

    }

    catch (err) {

        console.error(err);

        showToast("Server Error", "#dc2626");

    }

});


// ===========================================
// EDIT BLOG
// ===========================================

async function editBlog(id) {

    try {

        const response = await fetch(`/api/blogs/${id}`);

        const blog = await response.json();

        blogId.value = blog.id;

        title.value = blog.title;

        author.value = blog.author;

        category.value = blog.category;

        tags.value = blog.tags.join(",");

        image.value = blog.image;

        previewImage.src = blog.image;

        content.value = blog.content;

        charCount.textContent = blog.content.length;

        readingPreview.textContent = blog.readingTime;

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

        showToast("Edit Mode Enabled", "#2563eb");

    }

    catch (err) {

        console.log(err);

    }

}


// ===========================================
// DELETE BLOG
// ===========================================

async function deleteBlog(id) {

    const confirmDelete = confirm(

        "Are you sure you want to delete this blog?"

    );

    if (!confirmDelete) return;

    try {

        const response = await fetch(`/api/blogs/${id}`, {

            method: "DELETE"

        });

        const data = await response.json();

        showToast(data.message);

        loadBlogs();

    }

    catch (err) {

        console.log(err);

        showToast("Delete Failed", "#dc2626");

    }

}
async function likeBlog(id){

    await fetch(`/api/blogs/${id}/like`,{

        method:"POST"

    });

    loadBlogs();

}
// ===========================================
// LOAD BLOGS
// ===========================================

async function loadBlogs() {

    let url = "/api/blogs";

    const searchText = search.value.trim();

    const categoryValue = filterCategory.value;

    const params = new URLSearchParams();

    if (searchText) {

        params.append("search", searchText);

    }

    if (categoryValue) {

        params.append("category", categoryValue);

    }

    if (params.toString()) {

        url += "?" + params.toString();

    }

    try {

        const response = await fetch(url);

        const blogs = await response.json();

        blogContainer.innerHTML = "";

        if (blogs.length === 0) {

            blogContainer.innerHTML = `

            <div class="card">

                <h2>No Blogs Found</h2>

                <p>Create your first blog.</p>

            </div>

            `;

            return;

        }

        blogs.forEach(blog => {

            const card = document.createElement("div");

            card.className = "card";

            card.innerHTML = `

<img src="${blog.image}" class="blog-image">

<h2>${blog.title}</h2>

<p class="author">

👤 ${blog.author}

</p>

<span class="category">

${blog.category}

</span>

<div class="tag-container">

${blog.tags.map(tag=>`<span class="tag">${tag}</span>`).join("")}

</div>

<p>

${blog.content.substring(0,180)}...

</p>

<div class="info">

📅 ${blog.publishDate}

</div>

<div class="info">

✏ Updated : ${blog.updatedDate}

</div>

<div class="info">

⏱ ${blog.readingTime} min read

</div>

<div class="stats">

❤️ ${blog.likes}

&nbsp;&nbsp;

👁 ${blog.views}

</div>

<div class="button-group">

<button
class="like-btn"
onclick="likeBlog(${blog.id})">

❤️ Like

</button>

<button
class="edit-btn"
onclick="editBlog(${blog.id})">

✏ Edit

</button>

<button
class="delete-btn"
onclick="deleteBlog(${blog.id})">

🗑 Delete

</button>

</div>

`;

            blogContainer.appendChild(card);

        });

    }

    catch(err){

        console.log(err);

    }

}

loadBlogs();
search.addEventListener("keyup",()=>{

    loadBlogs();

});

