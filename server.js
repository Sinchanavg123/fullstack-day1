const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Temporary blog storage
let blogs = [];

// GET Route
app.get("/api/blogs", (req, res) => {
    res.json(blogs);
});

// POST Route
app.post("/api/blogs", (req, res) => {

    const { title, author, content } = req.body;

    const blog = {
        id: Date.now(),
        title,
        author,
        content
    };

    blogs.push(blog);

    res.status(201).json({
        message: "Blog Added Successfully",
        blog
    });

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});