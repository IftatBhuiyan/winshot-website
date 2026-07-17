/* WinShot site — nav, mobile menu, scroll reveals */
(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var burger = document.getElementById("burger");
  var mobile = document.getElementById("mobileMenu");

  // Sticky nav border once scrolled
  var onScroll = function () {
    if (nav) nav.classList.toggle("is-stuck", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  if (burger && mobile) {
    burger.addEventListener("click", function () {
      var open = mobile.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobile.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveals
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el, i) {
      // small stagger for grids
      el.style.transitionDelay = (Math.min(i % 6, 5) * 45) + "ms";
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Current year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Friendly note if a *local* installer placeholder isn't wired up yet.
  // (Skipped for external release URLs — a cross-origin HEAD check can't be trusted.)
  var dl = document.getElementById("downloadBtn");
  if (dl) {
    var href = dl.getAttribute("href") || "";
    var isLocal = !/^https?:\/\//i.test(href);
    if (isLocal) {
      dl.addEventListener("click", function (ev) {
        fetch(href, { method: "HEAD" })
          .then(function (r) { if (!r.ok) throw 0; })
          .catch(function () {
            ev.preventDefault();
            alert("Download coming soon.\n\nDrop your installer at:  downloads/WinShot-Setup.exe\n(or point this button at your release URL).");
          });
      });
    }
  }
})();
