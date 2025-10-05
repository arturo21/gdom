import { getAnimationEvent, setAnimationDuration } from './utils.js';

export function methods(el) {
  return {
    animate(name, arg, callback = () => {}) {
      const infinite = arg <= 1;
      const duration = infinite ? null : parseInt(arg);
      const prefix = getAnimationEvent();

      el.classList.add('animated', name);
      if (infinite) el.classList.add('infinite');
      else setAnimationDuration(el, duration);

      el.addEventListener(prefix, () => {
        el.classList.remove('animated', name, 'infinite');
        if (name === 'fadeOut') el.style.opacity = 0;
        if (name === 'fadeIn') el.style.opacity = 1;
        callback();
      });

      return this;
    }
  };
}
