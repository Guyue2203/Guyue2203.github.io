(() => {
  const links = [...document.querySelectorAll('.outline a[href^="#"]')];
  const headings = links.map((link) => document.getElementById(link.hash.slice(1)));
  if (!links.length || headings.some((heading) => !heading)) return;

  let activeIndex = -1;
  let scheduled = false;

  function updateActiveSection() {
    scheduled = false;
    const readingLine = window.innerHeight * 0.38;
    let nextIndex = 0;

    for (let index = 0; index < headings.length; index += 1) {
      if (headings[index].getBoundingClientRect().top <= readingLine) nextIndex = index;
    }

    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      nextIndex = headings.length - 1;
    }

    if (nextIndex === activeIndex) return;
    links.forEach((link, index) => {
      if (index === nextIndex) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    activeIndex = nextIndex;
  }

  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateActiveSection);
  }

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  updateActiveSection();
})();
