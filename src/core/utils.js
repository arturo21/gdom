export function getelem(ref) {
  if (typeof ref === 'string') return document.querySelector(ref);
  if (ref instanceof HTMLElement) return ref;
  return null;
}

export function getAnimationEvent() {
  const el = document.createElement('fake');
  const map = {
    animation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd',
    MozAnimation: 'animationend',
    OAnimation: 'oanimationend',
    MSAnimation: 'MSAnimationEnd'
  };
  for (const key in map) {
    if (el.style[key] !== undefined) return map[key];
  }
  return 'animationend';
}

export function setAnimationDuration(el, seconds) {
  el.style.animationDuration = `${seconds}s`;
}
