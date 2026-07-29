// ==============================
// Home Page JavaScript
// ==============================

// Blog container
const homeBlogContainer = document.getElementById("homeBlogContainer");

// Scroll to Top Button
const topBtn = document.getElementById("topBtn");

// ==============================
// Load Blogs
// ==============================

function loadHomeBlogs() {

    fetch("/api/blogs")

        .then(response => response.json())

        .then(blogs => {

            homeBlogContainer.innerHTML = "";

            // No blogs available
            if (blogs.length === 0) {

                homeBlogContainer.innerHTML = `
                    <div class="card">
                        <h3>No Blogs Published Yet</h3>
                        <p>
                            Start by creating your first blog from the Blog page.
                        </p>
                    </div>
                `;

                return;
            }

            // Latest blog first
            blogs.reverse().forEach(blog => {

                const card = document.createElement("div");

                card.className = "card";

                card.innerHTML = `
                    <h3>${blog.title}</h3>

                    <h4>By ${blog.author}</h4>

                    <p>${blog.content}</p>
                `;

                homeBlogContainer.appendChild(card);

            });

        })

        .catch(error => {

            console.error("Error loading blogs:", error);

            homeBlogContainer.innerHTML = `
                <div class="card">
                    <h3>Error</h3>
                    <p>Unable to load blogs. Please try again later.</p>
                </div>
            `;

        });

}

// Load blogs when page opens
loadHomeBlogs();

// ==============================
// Scroll To Top Button
// ==============================

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

// Scroll to top smoothly
topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});
<a
href="blog-details.html?id=${blog.id}"
class="btn">

Read More

</a>