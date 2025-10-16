export const methods = el => ({
  parent() {
    return el.parentNode;
  },

  prev() {
    return el.previousElementSibling || null;
  },

  next() {
    return el.nextElementSibling || null;
  },

  siblings() {
    return Array.from(el.parentNode.children).filter(child => child !== el);
  },

  closest(selector) {
    return el.closest(selector);
  }
});
