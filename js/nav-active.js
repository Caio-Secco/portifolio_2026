export function initNavActive() {
    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll('.nav a[href^="#"]');
    if (!sections.length || !links.length) return;

    const linkFor = (id) =>
        document.querySelector(`.nav a[href="#${id}"]`);

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                links.forEach((link) => link.classList.remove("active"));
                const activeLink = linkFor(entry.target.id);
                if (activeLink) activeLink.classList.add("active");
            });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
}
