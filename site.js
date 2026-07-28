(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var menuButton = document.getElementById("menu-button");
  var mobileNav = document.getElementById("mobile-nav");
  var year = document.getElementById("year");

  function closeMenu() {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
    var label = menuButton.querySelector(".sr-only");
    if (label) label.textContent = "Open navigation";
  }

  document.documentElement.classList.remove("no-js");
  closeMenu();

  if (header) {
    var updateHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 4);
    };
    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
  }

  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", function () {
      var willOpen = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(willOpen));
      mobileNav.hidden = !willOpen;
      var label = menuButton.querySelector(".sr-only");
      if (label) label.textContent = willOpen ? "Close navigation" : "Open navigation";
      if (willOpen) {
        var firstLink = mobileNav.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    });

    mobileNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuButton.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 1021px)").matches) closeMenu();
    });
  }

  if (year) year.textContent = String(new Date().getFullYear());
})();
