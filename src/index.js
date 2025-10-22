const dom = require('./core/dom.js');
const events = require('./core/events.js');
const animation = require('./core/animate.js');
const geometry = require('./core/geometry.js');
const traversal = require('./core/traversal.js');
const mutation = require('./core/mutation.js');
const form = require('./core/form.js');
const style = require('./core/style.js');
const structure = require('./core/structure.js');
const navigation = require('./core/navigation.js');
const scroll = require('./core/scroll.js');
const core = require('./core/core.js');
const { getelem } = require('./core/utils.js');
const módulos = {
  dom, events, animation, geometry, traversal,
  mutation, form, style, structure, navigation,
  scroll, core
};

const g = selector => {
  const el = getelem(selector);
  if (!el) return {};

  const resultado = {};

  for (const [nombre, mod] of Object.entries(módulos)) {
    if (!mod || typeof mod.methods !== 'function') {
      console.error(`[ERROR] El módulo "${nombre}" no tiene una función methods(el) válida`);
      continue;
    }
    try {
      Object.assign(resultado, mod.methods(el));
    } catch (err) {
      console.error(`[ERROR] Falló "${nombre}.methods(el)":`, err);
    }
  }

  return resultado;
};

// ✅ Exponer gdom al entorno global si está en navegador
if (typeof window !== 'undefined') {
  window.g = g;
}

module.exports = g;