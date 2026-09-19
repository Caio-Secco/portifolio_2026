const LINE_DELAY = 420;
const CARD_GAP = 500;

function setStatus(card, text, passed) {
    const status = card.querySelector('[data-role="status"]');
    if (!status) return;
    status.textContent = text;
    status.classList.toggle("passed", Boolean(passed));
}

function showFinal(card) {
    card.querySelectorAll(".run-line").forEach((line) => line.classList.add("visible"));
    setStatus(card, "aprovado ✓", true);
}

function runCard(card) {
    return new Promise((resolve) => {
        const lines = card.querySelectorAll(".run-line");
        card.classList.add("js-armed");
        setStatus(card, "executando", false);

        lines.forEach((line, index) => {
            setTimeout(() => line.classList.add("visible"), index * LINE_DELAY);
        });

        setTimeout(() => {
            setStatus(card, "aprovado ✓", true);
            resolve();
        }, lines.length * LINE_DELAY);
    });
}

async function runSequence(cards) {
    for (const card of cards) {
        await runCard(card);
        await new Promise((resolve) => setTimeout(resolve, CARD_GAP));
    }
}

export function initTestRunner() {
    const cards = document.querySelectorAll(".test-runner");
    if (!cards.length) return;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        cards.forEach(showFinal);
        return;
    }

    const trigger = document.querySelector(".terminal-grid") || cards[0];

    if (!("IntersectionObserver" in window)) {
        runSequence(cards);
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    runSequence(cards);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    observer.observe(trigger);
}
