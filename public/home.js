const homeBlogContainer = document.getElementById("homeBlogContainer");

function loadHomeBlogs() {

    fetch("/api/blogs")

        .then(response => response.json())

        .then(blogs => {

            homeBlogContainer.innerHTML = "";

            if (blogs.length === 0) {

                homeBlogContainer.innerHTML = `
                    <div class="card">
                        <h3>No Blogs Available</h3>
                        <p>Publish your first blog from the Blog page.</p>
                    </div>
                `;

                return;
            }

            blogs.forEach(blog => {

                const card = document.createElement("div");

                card.className = "card";

                card.innerHTML = `
                    <h3>${blog.title}</h3>

                    <p><strong>Author:</strong> ${blog.author}</p>

                    <p>${blog.content}</p>
                `;

                homeBlogContainer.appendChild(card);

            });

        })

        .catch(error => {

            console.error("Error loading blogs:", error);

        });

}

loadHomeBlogs();