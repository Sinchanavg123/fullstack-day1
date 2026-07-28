const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

// JavaScript Array to Store Blogs
let blogs = [];

// GET All Blogs
app.get("/api/blogs", (req, res) => {
    res.json(blogs);
});

// POST Add Blog
app.post("/api/blogs", (req, res) => {

    const { title, author, content } = req.body;

    // Validate Data
    if (!title || !author || !content) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newBlog = {
        id: blogs.length + 1,
        title,
        author,
        content
    };

    blogs.push(newBlog);

    res.status(201).json({
        message: "Blog Added Successfully!",
        blog: newBlog
    });

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});