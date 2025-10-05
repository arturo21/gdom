export function methods(el) {
  return {
    html(content) {
      if (content !== undefined) {
        el.innerHTML = content;
        return this;
      }
      return el.innerHTML;
    },
    text(content) {
      if (content !== undefined) {
        el.textContent = content;
        return this;
      }
      return el.textContent;
    },
    empty() {
      el.innerHTML = '';
      return this;
    },
    clone() {
      return el.cloneNode(true);
    },
    getEl() {
      return el;
    },
    getEls() {
      return Array.from(document.querySelectorAll(el.tagName));
    }
  };
}
