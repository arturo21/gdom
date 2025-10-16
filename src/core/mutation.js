export function methods(el) {
  return {
    append(child) {
      if (child instanceof HTMLElement) el.appendChild(child);
      return this;
    },
    prepend(html) {
      el.insertAdjacentHTML('afterbegin', html);
      return this;
    },
    before(html) {
      el.insertAdjacentHTML('beforebegin', html);
      return this;
    },
    after(html) {
      el.insertAdjacentHTML('afterend', html);
      return this;
    },
    remove() {
      el.parentNode?.removeChild(el);
      return this;
    },
    wrap(wrapper) {
      wrapper.appendChild(el.cloneNode(true));
      el.parentNode.insertBefore(wrapper, el);
      el.remove();
      return this;
    },
    unwrap() {
      const parent = el.parentNode;
      while (el.firstChild) parent.insertBefore(el.firstChild, el);
      parent.removeChild(el);
      return this;
    }
  };
}
