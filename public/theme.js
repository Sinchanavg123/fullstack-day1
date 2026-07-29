document.addEventListener("DOMContentLoaded", () => {

    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) return;

    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }

    // Toggle theme
    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙";
        }

    });

});