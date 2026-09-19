export function initReveal() {
    const reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        reveals.forEach((element) => element.classList.add("active"));
        return;
    }

    if (!("IntersectionObserver" in window)) {
        reveals.forEach((element) => element.classList.add("active"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    reveals.forEach((element) => observer.observe(element));
}
