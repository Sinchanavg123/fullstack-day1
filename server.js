const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const BLOG_FILE = path.join(__dirname, "blogs.json");

// Read blogs from file
function readBlogs() {
    try {
        const data = fs.readFileSync(BLOG_FILE, "utf8");

        if (!data) return [];

        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Save blogs into file
function saveBlogs(blogs) {
    fs.writeFileSync(BLOG_FILE, JSON.stringify(blogs, null, 2));
}

// =====================
// GET ALL BLOGS
// =====================

app.get("/api/blogs", (req, res) => {

    const blogs = readBlogs();

    res.json(blogs);

});

// =====================
// ADD BLOG
// =====================

app.post("/api/blogs", (req, res) => {

    const blogs = readBlogs();

    const { title, author, content } = req.body;

    const newBlog = {

        id: Date.now(),

        title,

        author,

        content

    };

    blogs.push(newBlog);

    saveBlogs(blogs);

    res.json({

        message: "Blog Published Successfully!",

        blog: newBlog

    });

});

// =====================
// UPDATE BLOG
// =====================

app.put("/api/blogs/:id", (req, res) => {

    const blogs = readBlogs();

    const id = Number(req.params.id);

    const blog = blogs.find(b => b.id === id);

    if (!blog) {

        return res.status(404).json({

            message: "Blog not found"

        });

    }

    blog.title = req.body.title;
    blog.author = req.body.author;
    blog.content = req.body.content;

    saveBlogs(blogs);

    res.json({

        message: "Blog Updated Successfully!"

    });

});

// =====================
// DELETE BLOG
// =====================

app.delete("/api/blogs/:id", (req, res) => {

    let blogs = readBlogs();

    const id = Number(req.params.id);

    blogs = blogs.filter(blog => blog.id !== id);

    saveBlogs(blogs);

    res.json({

        message: "Blog Deleted Successfully!"

    });

});

app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});