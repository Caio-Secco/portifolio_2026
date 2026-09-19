export function initCursorGlow() {
    const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouchDevice || prefersReducedMotion) return;

    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);

    let rafId = null;

    window.addEventListener("mousemove", (event) => {
        glow.classList.add("active");

        if (rafId) cancelAnimationFrame(rafId);

        rafId = requestAnimationFrame(() => {
            glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
        });
    });

    document.addEventListener("mouseleave", () => glow.classList.remove("active"));
}
