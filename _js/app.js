const nav = document.querySelector("nav.global");
const main = document.querySelector("main.global");

let lastKnownScrollPosition = 0;
let ticking = false;

function onScroll(scrollPos) {
  if (scrollPos > main.offsetTop) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
}

document.addEventListener("scroll", (e) => {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      onScroll(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
});
