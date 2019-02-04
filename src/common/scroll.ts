export function scrollIntoView(element: HTMLElement) {
  window.scroll({
    behavior: "smooth",
    left: 0,
    top: element.offsetTop
  });
}

export function scrollBehavior(): "auto" | "smooth" {
  return getSize() === "notSmall" ? "smooth" : "auto";
}

function getSize(): "notSmall" | "small" {
  return window
    .getComputedStyle(document.body, ":after")
    .getPropertyValue("content")
    .replace('"', "")
    .replace('"', "") === "notSmall"
    ? "notSmall"
    : "small";
}
