/* After the Flash — interactions */
(function () {
  // Fill image-slots with a tasteful tonal "plate" so the gallery reads as
  // intentionally hung even before real photos are dropped in. A user drop
  // (persisted by the component) always overrides this fallback src.
  function tone(hex) {
    var svg =
      "<svg xmlns='http://www.w3.org/2000/svg' width='4' height='3'>" +
      "<rect width='4' height='3' fill='%23" + hex + "'/></svg>";
    return "data:image/svg+xml," + svg.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/#/g, "%23");
  }
  function paintTones() {
    document.querySelectorAll("image-slot[data-tone]").forEach(function (el) {
      if (!el.hasAttribute("src")) el.setAttribute("src", tone(el.getAttribute("data-tone")));
    });
  }
  // run once custom element is defined so attribute is observed
  if (window.customElements && customElements.whenDefined) {
    customElements.whenDefined("image-slot").then(paintTones);
  }
  paintTones();

  // Nav: solid background after leaving the hero.
  var nav = document.getElementById("nav");
  var hero = document.querySelector(".hero");
  function onScroll() {
    var trigger = hero ? hero.offsetHeight - 90 : 480;
    if (window.scrollY > trigger) nav.classList.add("solid");
    else nav.classList.remove("solid");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Scroll reveal.
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
})();
