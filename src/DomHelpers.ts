export function isElementInViewport(el: Element) {
  const rect = el.getBoundingClientRect();

  return (
    isPointInViewport(rect.left, rect.top) &&
    isPointInViewport(rect.right, rect.bottom)
  );
}

export function isElementTopLeftInViewport(el: Element) {
  const rect = el.getBoundingClientRect();

  return isPointInViewport(rect.left, rect.top);
}

function isPointInViewport(x: number, y: number) {
  if (!document.documentElement) return false;
  return (
    y >= 0 &&
    x >= 0 &&
    y <= (window.innerHeight || document.documentElement.clientHeight) &&
    x <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
