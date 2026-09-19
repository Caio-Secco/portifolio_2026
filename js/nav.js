export function initNav() {
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}
