export function scrollIntoView(element: HTMLElement) {
  window.scroll({
    behavior: "smooth",
    left: 0,
    top: element.offsetTop - navBarHeight()
  });
}

export function navBarHeight() {
  let height = 35;
  const navSpacer = document.getElementById("navSpacer");
  if (navSpacer) {
    height = navSpacer.offsetHeight;
  } else {
    console.warn(
      'Element with id "navSpacer" not found. Assuming default height.'
    );
  }
  return height;
}
