export function methods(el) {
  const api = {
    html(content) {
      if (content !== undefined) {
        el.innerHTML = content;
        return api;
      }
      return el.innerHTML;
    },

    text(content) {
      if (content !== undefined) {
        el.textContent = content;
        return api;
      }
      return el.textContent;
    },

    empty() {
      el.innerHTML = '';
      return api;
    },

    clone(deep = true) {
      return el.cloneNode(deep);
    },

    getEl() {
      return el;
    },

    getEls() {
      return Array.from(document.querySelectorAll(el.tagName));
    },

    appendTo(target) {
      const parent = typeof target === 'string' ? document.querySelector(target) : target;
      if (parent) parent.appendChild(el);
      return api;
    },

    prependTo(target) {
      const parent = typeof target === 'string' ? document.querySelector(target) : target;
      if (parent) parent.insertBefore(el, parent.firstChild);
      return api;
    },

    wrap(wrapperTag = 'div', className = '') {
      const wrapper = document.createElement(wrapperTag);
      if (className) wrapper.className = className;
      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);
      return api;
    },

    unwrap() {
      const parent = el.parentNode;
      if (!parent || parent === document.body) return api;
      while (el.firstChild) parent.insertBefore(el.firstChild, el);
      parent.removeChild(el);
      return api;
    },

    replaceWith(newContent) {
      if (typeof newContent === 'string') {
        const temp = document.createElement('div');
        temp.innerHTML = newContent;
        el.replaceWith(...temp.childNodes);
      } else if (newContent instanceof Node) {
        el.replaceWith(newContent);
      }
      return api;
    },

    isEmpty() {
      return el.innerHTML.trim() === '';
    },

    contains(selector) {
      return el.querySelector(selector) !== null;
    },

    outerHTML(content) {
      if (content !== undefined) {
        const temp = document.createElement('div');
        temp.innerHTML = content;
        el.replaceWith(...temp.childNodes);
        return api;
      }
      return el.outerHTML;
    },

    detach() {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
      return api;
    },

    serialize() {
      if (el.tagName === 'FORM') {
        const data = new FormData(el);
        const obj = {};
        for (const [key, value] of data.entries()) {
          obj[key] = value;
        }
        return obj;
      }
      return {};
    }
  };

  return api;
};