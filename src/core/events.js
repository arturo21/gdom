export function methods(el) {
  const bind = (event, callback, options = {}) => {
    if (typeof callback === 'function') {
      el.addEventListener(event, callback, options);
    }
    return api;
  };

  const unbind = (event, callback) => {
    if (typeof callback === 'function') {
      el.removeEventListener(event, callback);
    }
    return api;
  };

  const api = {
    // 🔹 Básico
    on(event, callback) {
      return bind(event, callback);
    },

    off(event, callback) {
      return unbind(event, callback);
    },

    once(event, callback) {
      return bind(event, callback, { once: true });
    },

    trigger(eventName) {
      const evt = new Event(eventName, { bubbles: true });
      el.dispatchEvent(evt);
      return api;
    },

    preventDefault(event = 'click') {
      el.addEventListener(event, e => e.preventDefault());
      return api;
    },

    stopPropagation(event = 'click') {
      el.addEventListener(event, e => e.stopPropagation());
      return api;
    },

    // 🔹 Delegación
    delegate(event, selector, handler) {
      if (typeof handler !== 'function') return api;
      el.addEventListener(event, e => {
        const target = e.target.closest(selector);
        if (target && el.contains(target)) {
          handler.call(target, e);
        }
      });
      return api;
    },

    // 🔹 Shortcuts
    click(cb)        { return bind('click', cb); },
    change(cb)       { return bind('change', cb); },
    submit(cb)       { return bind('submit', cb); },
    keydown(cb)      { return bind('keydown', cb); },
    keyup(cb)        { return bind('keyup', cb); },
    mouseenter(cb)   { return bind('mouseenter', cb); },
    mouseleave(cb)   { return bind('mouseleave', cb); },
    focus(cb)        { return bind('focus', cb); },
    blur(cb)         { return bind('blur', cb); },
    input(cb)        { return bind('input', cb); }
  };

  return api;
}