export const methods = el => ({
  wrapAll(wrapperTag = 'div') {
    const wrapper = document.createElement(wrapperTag);
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
    return this;
  },

  unwrap() {
    const parent = el.parentNode;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    parent.removeChild(el);
    return this;
  },

  replaceWith(content) {
    if (typeof content === 'string') {
      const temp = document.createElement('div');
      temp.innerHTML = content;
      el.replaceWith(...temp.childNodes);
    } else if (content instanceof Node) {
      el.replaceWith(content);
    }
    return this;
  },

  first() {
    return el.children?.[0] || null;
  },

  last() {
    const children = el.children;
    return children?.[children.length - 1] || null;
  },

  index() {
    return Array.from(el.parentNode.children).indexOf(el);
  }
});
