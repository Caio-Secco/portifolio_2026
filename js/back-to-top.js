export function initBackToTop() {
    const button = document.getElementById("backToTop");
    if (!button) return;

    function toggle() {
        button.classList.toggle("visible", window.scrollY > 500);
    }

    window.addEventListener("scroll", toggle, { passive: true });
    toggle();

    button.addEventListener("click", () => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth",
        });
    });
}
