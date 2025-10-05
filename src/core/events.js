export function methods(el) {
  return {
    on(event, callback) {
      el.addEventListener(event, callback);
      return this;
    },
    trigger(eventName) {
      const evt = new Event(eventName, { bubbles: true });
      el.dispatchEvent(evt);
      return this;
    },
    preventDefault() {
      el.addEventListener('click', e => e.preventDefault());
      return this;
    },
    stopPropagation() {
      el.addEventListener('click', e => e.stopPropagation());
      return this;
    }
  };
}
