export function initScrollProgress() {
    const bar = document.getElementById("scrollProgress");
    if (!bar) return;

    function update() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
}
