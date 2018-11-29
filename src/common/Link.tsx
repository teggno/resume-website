import React from "React";

export default function Link(props: {
  href: string;
  scrollToTop?: boolean;
  children: any;
  className: string;
}) {
  return (
    <a
      className={props.className}
      href={props.href}
      onClick={e => {
        if (props.scrollToTop) {
          e.preventDefault();
          window.location.href = props.href;
          window.scrollTo(0, 0);
        }
      }}
    >
      {props.children}
    </a>
  );
}
