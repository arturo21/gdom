export function methods(el) {
  return {
    val(value) {
      if (value !== undefined) {
        el.value = value;
        return this;
      }
      return el.value;
    },
    emptyVal() {
      el.value = '';
      return this;
    },
    resetText() {
      el.value = '';
      return this;
    },
    intval() {
      return parseInt(el.value);
    },
    floatval() {
      return parseFloat(el.value);
    },
    getFiles() {
      return el.files ?? null;
    },
    serialize() {
      if (el.tagName !== 'FORM') return {};
      const data = new FormData(el);
      const result = {};
      for (const [key, value] of data.entries()) {
        result[key] = value;
      }
      return result;
    }
  };
}
