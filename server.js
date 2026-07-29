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
    // PUT - Update Blog
app.put("/api/blogs/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const { title, author, content } = req.body;

    const blog = blogs.find(blog => blog.id === id);

    if (!blog) {

        return res.status(404).json({
            message: "Blog Not Found"
        });

    }

    blog.title = title;
    blog.author = author;
    blog.content = content;

    res.json({

        message: "Blog Updated Successfully",

        blog

    });

});

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
app.put("/api/blogs/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const { title, author, content } = req.body;

    const blog = blogs.find(blog => blog.id === id);

    if (!blog) {
        return res.status(404).json({
            message: "Blog not found"
        });
    }

    blog.title = title;
    blog.author = author;
    blog.content = content;

    res.json({
        message: "Blog Updated Successfully!",
        blog
    });

});