import { useEffect, Ref } from "react";

export default function useClickOutside(
  clickedOutside: () => void,
  ...inside: any[]
) {
  const listener = (e: Event) => {
    if (inside.some((i) => i.current && i.current.contains(e.target))) {
      return;
    }

    clickedOutside();
  };
  useEffect(() => {
    window.addEventListener("click", listener);

    return () => window.removeEventListener("click", listener);
  });
}
