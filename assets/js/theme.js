
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon")
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light" || savedTheme === "dark") {
    root.dataset.theme = savedTheme;
}

function getCurrentTheme() {
    return root.dataset.theme ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light");
}

function updateThemeButton() {
    const isDark = getCurrentTheme() === "dark";

    themeIcon.src = isDark
        ? "./assets/img/sun.svg"
        : "./assets/img/moon.svg";
}

themeToggle.addEventListener("click", () => {
    const newTheme = getCurrentTheme() === "dark"
        ? "light"
        : "dark";

    root.dataset.theme = newTheme;

    localStorage.setItem("theme", newTheme);

    updateThemeButton();
});


updateThemeButton();
