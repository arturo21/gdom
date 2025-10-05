export function methods(el) {
  return {
    show() {
      el.style.display = 'block';
      return this;
    },
    hide() {
      el.style.display = 'none';
      return this;
    },
    toggleDisplay() {
      el.style.display = el.style.display === 'none' ? '' : 'none';
      return this;
    },
    cursor(style) {
      el.style.cursor = style;
      return this;
    },
    hasClass(cls) {
      return el.classList.contains(cls);
    },
    css(property, value) {
      if (typeof property === 'string' && value !== undefined) {
        el.style[property] = value;
        return this;
      }
      if (typeof property === 'object') {
        Object.entries(property).forEach(([key, val]) => {
          el.style[key] = val;
        });
        return this;
      }
      if (typeof property === 'string') {
        return getComputedStyle(el)[property];
      }
    },
    addClass(className) {
      if (!className || typeof className !== 'string') return this;
      className.trim().split(/\s+/).forEach(cls => {
        if (cls) el.classList.add(cls);
      });
      return this;
    },

    removeClass(className) {
      if (!className || typeof className !== 'string') return this;
      className.trim().split(/\s+/).forEach(cls => {
        if (cls) el.classList.remove(cls);
      });
      return this;
    },

    toggleClass(className) {
      if (!className || typeof className !== 'string') return this;
      className.trim().split(/\s+/).forEach(cls => {
        if (cls) el.classList.toggle(cls);
      });
      return this;
    }
  };
}
