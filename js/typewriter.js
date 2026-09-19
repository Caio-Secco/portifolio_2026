const ROLES = [
    "QA Engineer",
    "Automação E2E",
    "Testes de API",
    "Quality Assurance",
];

const TYPE_SPEED = 90;
const DELETE_SPEED = 45;
const HOLD_TIME = 1600;

export function initTypewriter() {
    const target = document.getElementById("typedRole");
    if (!target) return;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        target.textContent = ROLES[0];
        return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
        const currentRole = ROLES[roleIndex];

        if (!deleting) {
            charIndex++;
            target.textContent = currentRole.slice(0, charIndex);

            if (charIndex === currentRole.length) {
                deleting = true;
                setTimeout(tick, HOLD_TIME);
                return;
            }

            setTimeout(tick, TYPE_SPEED);
        } else {
            charIndex--;
            target.textContent = currentRole.slice(0, charIndex);

            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % ROLES.length;
            }

            setTimeout(tick, DELETE_SPEED);
        }
    }

    tick();
}
