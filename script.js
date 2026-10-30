/* Progressive enhancement for the portfolio.
   - Marks <body class="js"> so reveal styles only apply when JS is available
     (no-JS users get all content visible immediately).
   - Smooth-scrolls in-page nav links.
   - Docks the nav bars after the hero and runs the mobile bar menu.
   - Panel spotlight, timeline fill and date scramble.
   - Reveals [data-reveal] elements as they enter the viewport (vanilla
     replacement for ScrollReveal — no external dependency). */
(() => {
  document.body.classList.add("js");

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Dock the nav bars once the hero is mostly off screen
  const body = document.body;
  new IntersectionObserver(
    ([entry]) => body.classList.toggle("nav-docked", entry.intersectionRatio < 0.2),
    { threshold: 0.2 }
  ).observe(document.querySelector(".header"));

  // Highlight the section being read
  // Short sections at the bottom never reach the 40% line, so a jumped-to
  // section stays active until the reader scrolls by hand.
  const sections = document.querySelectorAll("main > section");
  let pinned = document.getElementById(location.hash.slice(1));
  const unpin = () => (pinned = null);
  ["wheel", "touchmove", "keydown"].forEach((ev) => addEventListener(ev, unpin, { passive: true }));
  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", () => {
      pinned = document.querySelector(a.hash);
      setActive();
    })
  );
  const setActive = () => {
    let current = sections[0];
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top < innerHeight * 0.4) current = s;
    });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) {
      current = sections[sections.length - 1];
    }
    if (pinned?.matches("main > section")) current = pinned;
    ["dock__link", "menu__link"].forEach((cls) =>
      document.querySelectorAll(`.${cls}`).forEach((a) =>
        a.classList.toggle(`${cls}--active`, a.hash === `#${current.id}`)
      )
    );
  };
  setActive();
  addEventListener("scroll", setActive, { passive: true });

  // Mobile bar menu
  const tab = document.querySelector(".menu-tab");
  const setMenu = (open) => {
    body.classList.toggle("menu-open", open);
    tab.setAttribute("aria-expanded", open);
    tab.textContent = open ? "✕" : "≡";
  };
  tab.addEventListener("click", () => setMenu(!body.classList.contains("menu-open")));
  document.querySelectorAll(".menu__link").forEach((a) =>
    a.addEventListener("click", () => setMenu(false))
  );
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  // Cursor spotlight on panels
  if (matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".panel").forEach((p) =>
      p.addEventListener("mousemove", (e) => {
        const r = p.getBoundingClientRect();
        p.style.setProperty("--x", `${e.clientX - r.left}px`);
        p.style.setProperty("--y", `${e.clientY - r.top}px`);
      })
    );
  }

  // Timeline line fills with scroll progress through it
  const timeline = document.getElementById("timeline");
  const fillTimeline = () => {
    const r = timeline.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
    timeline.style.setProperty("--progress", progress);
  };
  fillTimeline();
  addEventListener("scroll", fillTimeline, { passive: true });

  // Scroll reveal
  const els = document.querySelectorAll("[data-reveal]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // Dates scramble through symbols, then settle
  const scramble = (el) => {
    const text = el.textContent;
    const chars = "01<>/{}[]#*+=_";
    const frames = 18;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      el.textContent = [...text]
        .map((c, i) => (c === " " || i < (text.length * frame) / frames ? c : chars[(Math.random() * chars.length) | 0]))
        .join("");
      if (frame === frames) clearInterval(id);
    }, 40);
  };

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const panels = [...el.parentElement.children].filter((c) => c.classList.contains("panel"));
          el.style.transitionDelay = `${(panels.indexOf(el) % 3) * 90}ms`;
          el.classList.add("is-visible");
          el.querySelectorAll(".era__period").forEach(scramble);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  els.forEach((el) => io.observe(el));
})();
