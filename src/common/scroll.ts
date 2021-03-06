import { useEffect, useState } from "react";

export function scrollIntoView(element: HTMLElement) {
  window.scroll({
    behavior: "smooth",
    left: 0,
    top: element.offsetTop - navBarHeight(),
  });
}

export function navBarHeight() {
  let height = 50;
  const header = document.getElementById("header");
  if (header) {
    height = header.offsetHeight;
  } else {
    console.warn(
      'Element with id "header" not found. Assuming default height.'
    );
  }
  return height;
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
