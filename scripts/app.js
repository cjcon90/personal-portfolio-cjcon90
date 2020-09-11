document.querySelectorAll('a[href^="#"]').forEach((elem) => {
   elem.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(elem.getAttribute("href")).scrollIntoView({
         behavior: "smooth",
      });
   });
});
