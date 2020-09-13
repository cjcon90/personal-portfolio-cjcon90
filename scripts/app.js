// NAV LINK SCROLL ACTION
document.querySelectorAll('a[href^="#"]').forEach((elem) => {
   elem.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(elem.getAttribute("href")).scrollIntoView({
         behavior: "smooth",
      });
   });
});

// REVEAL ELEMENTS ON SCROLL

ScrollReveal().reveal(".skills__heading", { delay: 300, duration: 1000 });
ScrollReveal().reveal(".profile", { duration: 1000 });
ScrollReveal().reveal(".skills__block", { delay: 800, interval: 200 });
ScrollReveal().reveal(".projects__heading", { duration: 1000 });
ScrollReveal().reveal(".projects__card", { delay: 200, duration: 1000 });

//CONTACT FORM FUNCTIONALITY

const name = document.getElementById("name");
const nameError = document.getElementById("name-error");
const email = document.getElementById("email");
const emailError = document.getElementById("email-error");
const message = document.getElementById("message");
const messageError = document.getElementById("message-error");
const submit = document.getElementById("submit");
const mailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

submit.addEventListener("click", (e) => {
   name.value.trim().length > 0 ? (nameError.style.opacity = "0") : ((nameError.style.opacity = "1"), e.preventDefault());

   if (email.value.trim() === "") {
      emailError.textContent = "What's your email?";
      emailError.style.opacity = "1";
      e.preventDefault();
   } else if (!mailReg.test(email.value)) {
      emailError.textContent = "Hmm... this doesn't look right.";
      emailError.style.opacity = "1";
      e.preventDefault();
   } else {
      emailError.style.opacity = "0";
   }

   message.value.trim().length > 0 ? (messageError.style.opacity = "0") : ((messageError.style.opacity = "1"), e.preventDefault());
});
