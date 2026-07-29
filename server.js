const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const BLOG_FILE = path.join(__dirname, "blogs.json");

// ------------------------
// Read Blogs
// ------------------------

function readBlogs() {

    try {

        if (!fs.existsSync(BLOG_FILE)) {

            fs.writeFileSync(BLOG_FILE, "[]");

        }

        const data = fs.readFileSync(BLOG_FILE, "utf8");

        return JSON.parse(data);

    }

    catch {

        return [];

    }

}

// ------------------------
// Save Blogs
// ------------------------

function saveBlogs(blogs) {

    fs.writeFileSync(

        BLOG_FILE,

        JSON.stringify(blogs, null, 2)

    );

}

// ------------------------
// Reading Time
// ------------------------

function readingTime(text) {

    const words = text.trim().split(/\s+/).length;

    return Math.max(1, Math.ceil(words / 200));

}
// =========================================
// GET ALL BLOGS
// =========================================

app.get("/api/blogs", (req, res) => {

    let blogs = readBlogs();

    const { search, category, sort } = req.query;

    // Search
    if (search) {

        const keyword = search.toLowerCase();

        blogs = blogs.filter(blog =>

            blog.title.toLowerCase().includes(keyword) ||

            blog.author.toLowerCase().includes(keyword) ||

            blog.content.toLowerCase().includes(keyword)

        );

    }

    // Category Filter
    if (category) {

        blogs = blogs.filter(blog =>

            blog.category &&
            blog.category.toLowerCase() === category.toLowerCase()

        );

    }

    // Sort

    if (sort === "oldest") {

        blogs.sort((a, b) => a.id - b.id);

    } else {

        blogs.sort((a, b) => b.id - a.id);

    }

    res.json(blogs);

});

// =========================================
// GET SINGLE BLOG
// =========================================

app.get("/api/blogs/:id", (req, res) => {

    const blogs = readBlogs();

    const id = Number(req.params.id);

    const blog = blogs.find(b => b.id === id);

    if (!blog) {

        return res.status(404).json({

            message: "Blog not found"

        });

    }

    res.json(blog);

});
// ===================================
// GET SINGLE BLOG
// ===================================

app.get("/api/blogs/:id", (req, res) => {

    const blogs = readBlogs();

    const id = Number(req.params.id);

    const blog = blogs.find(b => b.id === id);

    if (!blog) {

        return res.status(404).json({

            message: "Blog not found"

        });

    }

    res.json(blog);

});

// =========================================
// CREATE BLOG
// =========================================

app.post("/api/blogs", (req, res) => {

    const blogs = readBlogs();

    const {

        title,
        author,
        category,
        tags,
        image,
        content

    } = req.body;

    // Validation

    if (!title || !author || !content) {

        return res.status(400).json({

            message: "Title, Author and Content are required."

        });

    }

    const newBlog = {

        id: Date.now(),

        title: title.trim(),

        author: author.trim(),

        category: category || "General",

        tags: tags
            ? tags.split(",").map(tag => tag.trim())
            : [],

        image: image ||
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",

        content: content.trim(),

        readingTime: readingTime(content),

        publishDate: new Date().toLocaleDateString(),

        updatedDate: new Date().toLocaleDateString(),

        likes: 0,

        views: 0

    };

    blogs.push(newBlog);

    saveBlogs(blogs);

    res.status(201).json({

        message: "Blog Published Successfully!",

        blog: newBlog

    });

});
// =========================================
// UPDATE BLOG
// =========================================

app.put("/api/blogs/:id", (req, res) => {

    const blogs = readBlogs();

    const id = Number(req.params.id);

    const blog = blogs.find(b => b.id === id);

    if (!blog) {

        return res.status(404).json({
            message: "Blog not found"
        });

    }

    const {
        title,
        author,
        category,
        tags,
        image,
        content
    } = req.body;

    blog.title = title || blog.title;
    blog.author = author || blog.author;
    blog.category = category || blog.category;

    blog.tags = tags
        ? tags.split(",").map(tag => tag.trim())
        : blog.tags;

    blog.image = image || blog.image;

    blog.content = content || blog.content;

    blog.readingTime = readingTime(blog.content);

    blog.updatedDate = new Date().toLocaleDateString();

    saveBlogs(blogs);

    res.json({
        message: "Blog Updated Successfully!",
        blog
    });

});

// =========================================
// DELETE BLOG
// =========================================

app.delete("/api/blogs/:id", (req, res) => {

    let blogs = readBlogs();

    const id = Number(req.params.id);

    const blog = blogs.find(b => b.id === id);

    if (!blog) {

        return res.status(404).json({
            message: "Blog not found"
        });

    }

    blogs = blogs.filter(blog => blog.id !== id);

    saveBlogs(blogs);

    res.json({

        message: "Blog Deleted Successfully!"

    });

});

// =========================================
// LIKE BLOG
// =========================================

app.post("/api/blogs/:id/like", (req, res) => {

    const blogs = readBlogs();

    const id = Number(req.params.id);

    const blog = blogs.find(b => b.id === id);

    if (!blog) {

        return res.status(404).json({
            message: "Blog not found"
        });

    }

    blog.likes++;

    saveBlogs(blogs);

    res.json({

        message: "Blog Liked!",

        likes: blog.likes

    });

});

// =========================================
// INCREASE VIEW COUNT
// =========================================

app.post("/api/blogs/:id/view", (req, res) => {

    const blogs = readBlogs();

    const id = Number(req.params.id);

    const blog = blogs.find(b => b.id === id);

    if (!blog) {

        return res.status(404).json({
            message: "Blog not found"
        });

    }

    blog.views++;

    saveBlogs(blogs);

    res.json({

        views: blog.views

    });

});

// =========================================
// SERVER
// =========================================

app.listen(PORT, () => {

    console.log(`🚀 Server running on http://localhost:${PORT}`);

});
app.put("/api/blogs/:id", (req, res) => {

    const blogs = readBlogs();

    const id = Number(req.params.id);

    const blog = blogs.find(b => b.id === id);

    if (!blog) {
        return res.status(404).json({
            message: "Blog not found"
        });
    }

    const {
        title,
        author,
        category,
        tags,
        image,
        content
    } = req.body;

    blog.title = title || blog.title;
    blog.author = author || blog.author;
    blog.category = category || blog.category;
    blog.tags = tags
        ? tags.split(",").map(tag => tag.trim())
        : blog.tags;
    blog.image = image || blog.image;
    blog.content = content || blog.content;

    blog.readingTime = readingTime(blog.content);
    blog.updatedDate = new Date().toLocaleDateString();

    saveBlogs(blogs);

    res.json({
        message: "Blog Updated Successfully!",
        blog
    });

});