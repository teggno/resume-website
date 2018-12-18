import React from "react";
import Link from "../common/Link";
import { link, normalFontSize } from "../css";

export default function Navigation() {
  return (
    <>
      <nav className={"bg-white shadow-1 fixed w-100 z-999 top-0"}>
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
      <div style={{ height: "3.2rem" }} id="navSpacer" />
    </>
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
  return <li className="dib pa3" >{children}</li>;
}

function NavLinkItem({ href, text }: { href: string; text: string }) {
  return (
    <NavItem>
      <NavLink href={href} text={text} />
    </NavItem>
  );
}
