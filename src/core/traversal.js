export function methods(el) {
  return {
    // 🧭 Traversing básico
    parent() {
      return el.parentNode;
    },
    children() {
      return Array.from(el.children);
    },
    first() {
      return el.children[0] ?? null;
    },
    last() {
      return el.children[el.children.length - 1] ?? null;
    },
    next() {
      return el.nextElementSibling ?? null;
    },
    prev() {
      return el.previousElementSibling ?? null;
    },
    closest(selector) {
      return el.closest(selector);
    },
    siblings() {
      return Array.from(el.parentNode.children).filter(child => child !== el);
    },
    index() {
      return Array.from(el.parentNode.children).indexOf(el);
    },

    // 🧭 Traversing avanzado
    find(selector) {
      return Array.from(el.querySelectorAll(selector));
    },
    eq(index) {
      return el.parentNode?.children?.[index] ?? null;
    },
    not(selector) {
      return el.matches(selector) ? null : el;
    },
    filter(fn) {
      return fn(el) ? el : null;
    },
    each(fn) {
      fn.call(el, 0, el);
      return el;
    },

    // 🧩 Manipulación avanzada de atributos
    attr(key, val) {
      if (val === undefined) {
        return el.getAttribute(key);
      }
      el.setAttribute(key, val);
      return el;
    },
    removeAttr(key) {
      el.removeAttribute(key);
      return el;
    },
    prop(key, val) {
      if (val === undefined) {
        return el[key];
      }
      el[key] = val;
      return el;
    }
  };
}