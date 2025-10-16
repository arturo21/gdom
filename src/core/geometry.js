export function methods(el) {
  return {
    offset() {
      const rect = el.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX
      };
    },
    scrollTop(value) {
      if (value === undefined) return el.getBoundingClientRect().top;
      el.style.transform = `translateY(${value}px)`;
      return this;
    },
    scrollLeft(value) {
      if (value === undefined) return el.getBoundingClientRect().left;
      el.style.transform = `translateX(${value}px)`;
      return this;
    },
    outerHeight(includeMargin = false) {
      const style = getComputedStyle(el);
      let height = el.offsetHeight;
      if (includeMargin) height += parseInt(style.marginTop) + parseInt(style.marginBottom);
      return height;
    },
    outerWidth(includeMargin = false) {
      const style = getComputedStyle(el);
      let width = el.offsetWidth;
      if (includeMargin) width += parseInt(style.marginLeft) + parseInt(style.marginRight);
      return width;
    },
    position() {
      return { top: el.offsetTop, left: el.offsetLeft };
    }
  };
}
