/* =====================================================
   PROJETOS - CARROSSEL EM PILHA
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const stack = document.querySelector(".projects-stack");

    if (!stack) return;

    const grid = stack.querySelector(".projects-grid");
    const cards = Array.from(
        grid.querySelectorAll(".project-card")
    );
    const dotsContainer = stack.querySelector(".projects-dots");

    if (!cards.length || !dotsContainer) return;

    const mobileQuery = window.matchMedia("(max-width: 600px)");

    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let dragging = false;
    let animating = false;


    /* =================================================
       CRIA OS PONTOS
       ================================================= */

    cards.forEach((_, index) => {

        const dot = document.createElement("button");

        dot.className = "projects-dot";

        dot.type = "button";

        dot.setAttribute(
            "aria-label",
            `Ir para o projeto ${index + 1}`
        );

        dot.addEventListener("click", () => {

            if (animating) return;

            currentIndex = index;

            render();

        });

        dotsContainer.appendChild(dot);

    });


    const dots = Array.from(
        dotsContainer.querySelectorAll(".projects-dot")
    );


    /* =================================================
       RENDERIZA A PILHA
       ================================================= */

    function render() {

        if (!mobileQuery.matches) return;

        cards.forEach((card, index) => {

            card.classList.remove(
                "stack-active",
                "stack-1",
                "stack-2",
                "stack-3",
                "stack-hidden"
            );

            const position =
                (index - currentIndex + cards.length)
                % cards.length;


            if (position === 0) {

                card.classList.add("stack-active");

            } else if (position === 1) {

                card.classList.add("stack-1");

            } else if (position === 2) {

                card.classList.add("stack-2");

            } else if (position === 3) {

                card.classList.add("stack-3");

            } else {

                card.classList.add("stack-hidden");

            }

        });


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });

    }


    /* =================================================
       PRÓXIMO
       ================================================= */

    function next() {

        if (animating) return;

        animating = true;

        const activeCard = cards[currentIndex];

        activeCard.style.transform =
            "translate3d(-120%, 0, 0) rotate(-6deg)";

        activeCard.style.opacity = "0";


        setTimeout(() => {

            currentIndex =
                (currentIndex + 1) % cards.length;

            activeCard.style.transform = "";
            activeCard.style.opacity = "";

            render();

            animating = false;

        }, 350);

    }


    /* =================================================
       ANTERIOR
       ================================================= */

    function previous() {

        if (animating) return;

        animating = true;

        const previousIndex =
            (currentIndex - 1 + cards.length)
            % cards.length;

        const previousCard = cards[previousIndex];


        previousCard.style.transition = "none";

        previousCard.style.transform =
            "translate3d(120%, 0, 0) rotate(6deg)";

        previousCard.style.opacity = "0";

        previousCard.offsetHeight;


        previousCard.style.transition =
            "transform .35s ease, opacity .35s ease";

        previousCard.style.transform =
            "translate3d(0, 0, 0) scale(1)";

        previousCard.style.opacity = "1";


        setTimeout(() => {

            currentIndex = previousIndex;

            cards.forEach(card => {

                card.style.transform = "";
                card.style.opacity = "";

            });

            render();

            animating = false;

        }, 350);

    }


    /* =================================================
       SWIPE / DRAG
       ================================================= */

    const activeArea = stack;


    activeArea.addEventListener(
        "pointerdown",
        (event) => {

            if (!mobileQuery.matches) return;

            if (animating) return;

            if (
                event.target.closest("a") ||
                event.target.closest("button")
            ) {
                return;
            }

            dragging = true;

            startX = event.clientX;
            currentX = startX;

            const activeCard = cards[currentIndex];

            activeCard.style.transition = "none";

            activeArea.setPointerCapture(event.pointerId);

        }
    );


    activeArea.addEventListener(
        "pointermove",
        (event) => {

            if (!dragging) return;

            currentX = event.clientX;

            const deltaX = currentX - startX;

            const activeCard = cards[currentIndex];

            const rotation = deltaX * 0.03;

            activeCard.style.transform =
                `translate3d(${deltaX}px, 0, 0) rotate(${rotation}deg)`;

            activeCard.style.opacity =
                Math.max(
                    0.35,
                    1 - Math.abs(deltaX) / 350
                );

        }
    );


    activeArea.addEventListener(
        "pointerup",
        (event) => {

            if (!dragging) return;

            dragging = false;

            const deltaX = currentX - startX;

            const activeCard = cards[currentIndex];

            activeCard.style.transition =
                "transform .35s ease, opacity .35s ease";


            if (Math.abs(deltaX) > 70) {

                if (deltaX < 0) {

                    next();

                } else {

                    previous();

                }

            } else {

                activeCard.style.transform =
                    "translate3d(0, 0, 0) scale(1)";

                activeCard.style.opacity = "1";

            }

        }
    );


    activeArea.addEventListener(
        "pointercancel",
        () => {

            dragging = false;

            const activeCard = cards[currentIndex];

            activeCard.style.transition =
                "transform .35s ease, opacity .35s ease";

            activeCard.style.transform =
                "translate3d(0, 0, 0) scale(1)";

            activeCard.style.opacity = "1";

        }
    );


    /* =================================================
       DESKTOP
       ================================================= */

    function handleResponsive() {

        if (mobileQuery.matches) {

            render();

        } else {

            cards.forEach(card => {

                card.classList.remove(
                    "stack-active",
                    "stack-1",
                    "stack-2",
                    "stack-3",
                    "stack-hidden"
                );

                card.style.transform = "";
                card.style.opacity = "";
                card.style.transition = "";

            });

            dots.forEach(dot => {

                dot.classList.remove("active");

            });

        }

    }


    mobileQuery.addEventListener(
        "change",
        handleResponsive
    );


    /* =================================================
       INICIALIZA
       ================================================= */

    handleResponsive();

});