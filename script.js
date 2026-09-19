const root = document.documentElement;

window.addEventListener("pointermove", (event) => {
  root.style.setProperty("--pointer-x", `${event.clientX}px`);
  root.style.setProperty("--pointer-y", `${event.clientY}px`);
}, { passive: true });

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6%" });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll(".project-open").forEach((button) => {
  const dialog = document.getElementById(button.getAttribute("aria-controls"));
  if (!dialog) return;
  button.addEventListener("click", () => {
    dialog.showModal();
    document.body.classList.add("dialog-open");
  });
  dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (outside) dialog.close();
  });
});
