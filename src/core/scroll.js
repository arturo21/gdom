export const methods = el => ({
  scrollTop(value) {
    if (value === undefined) return el.scrollTop;
    el.scrollTop = value;
    return this;
  },

  scrollLeft(value) {
    if (value === undefined) return el.scrollLeft;
    el.scrollLeft = value;
    return this;
  },

  gotodiv() {
    el.scrollIntoView({ behavior: 'smooth' });
    return this;
  },

  smooth(target, { duration = 500, offset = 0, callback } = {}) {
    const start = window.pageYOffset;
    const end = typeof target === 'string'
      ? document.querySelector(target).offsetTop + offset
      : target.offsetTop + offset;
    const change = end - start;
    const startTime = performance.now();

    function animateScroll(currentTime) {
      const time = currentTime - startTime;
      const val = easeInOutQuad(time, start, change, duration);
      window.scrollTo(0, val);
      if (time < duration) {
        requestAnimationFrame(animateScroll);
      } else if (typeof callback === 'function') {
        callback();
      }
    }

    requestAnimationFrame(animateScroll);
    return this;
  }
});
