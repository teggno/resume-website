import React from "react";
import Link from "../../src/common/Link";
import { link } from "../../src/css";

export default function Navigation() {
  return (
    <nav className="dib">
      <ul className="list ph0 ma0 nowrap">
        <NavLinkItem href="#" text="Home" />
        {"\n"}
        <NavLinkItem href="#projects" text="Projects" />
        {"\n"}
        <NavLinkItem href="#technologies" text="Technologies" />
        {"\n"}
        <NavLinkItem href="#timeline" text="Timeline" />
      </ul>
    </nav>
  );
}

function NavLink({ href, text }: { href: string; text: string }) {
  return (
    <Link className={link + " f5"} href={href} scrollToTop={true}>
      {text}
    </Link>
  );
}

function NavItem({ children }: any) {
  return <li className="dib pa3">{children}</li>;
}

function NavLinkItem({ href, text }: { href: string; text: string }) {
  return (
    <NavItem>
      <NavLink href={href} text={text} />
    </NavItem>
  );
}
