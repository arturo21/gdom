import * as dom from './core/dom.js';
import * as events from './core/events.js';
import * as animation from './core/animation.js';
import * as geometry from './core/geometry.js';
import * as traversal from './core/traversal.js';
import * as mutation from './core/mutation.js';
import * as form from './core/form.js';
import * as style from './core/style.js';
import * as structure from './core/structure.js';
import * as navigation from './core/navigation.js';
import * as scroll from './core/scroll.js';
import * as core from './core/core.js';
import { getelem } from './core/utils.js';

export const g = selector => {
  const el = getelem(selector);
  if (!el) return {};

  return {
    ...dom.methods(el),
    ...events.methods(el),
    ...animation.methods(el),
    ...geometry.methods(el),
    ...traversal.methods(el),
    ...mutation.methods(el),
    ...form.methods(el),
    ...style.methods(el),
    ...structure.methods(el),
    ...navigation.methods(el),
    ...scroll.methods(el),
    ...core.methods(el)
  };
};

// ✅ Exponer g al entorno global
if (typeof window !== 'undefined') {
  window.g = g;
}
