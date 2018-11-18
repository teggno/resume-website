export function isElementInViewport(el: Element) {
  const rect = el.getBoundingClientRect();

  if (!document.documentElement) return false;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
