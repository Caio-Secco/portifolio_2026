const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");


// MENU MOBILE
menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});



// ANIMAÇÃO AO SCROLL

const reveals = document.querySelectorAll(".reveal");


function revealOnScroll() {

    reveals.forEach((element) => {

        const windowHeight = window.innerHeight;

        const elementTop = element.getBoundingClientRect().top;

        const revealPoint = 120;


        if (elementTop < windowHeight - revealPoint) {

            element.classList.add("active");

        }

    });

}


window.addEventListener("scroll", revealOnScroll);


// Executa ao abrir a página
revealOnScroll();



// ANO AUTOMÁTICO FOOTER

const year = document.getElementById("year");

if(year){

    year.textContent = new Date().getFullYear();

}