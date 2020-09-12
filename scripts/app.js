document.querySelectorAll('a[href^="#"]').forEach((elem) => {
   elem.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(elem.getAttribute("href")).scrollIntoView({
         behavior: "smooth",
      });
   });
});

ScrollReveal().reveal(".skills__heading", { delay: 300, duration: 1000 });
ScrollReveal().reveal(".profile", { duration: 1000 });
ScrollReveal().reveal(".skills__block", { delay: 800, interval: 200 });
ScrollReveal().reveal(".projects__heading", { duration: 1000 });
ScrollReveal().reveal(".projects__card", { delay: 200, duration: 1000 });
