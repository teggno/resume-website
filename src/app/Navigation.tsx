import React from "react";
import Link from "../common/Link";
import { link } from "../css";

export default function Navigation() {
  return (
    <div>
      <nav className="fixed bg-white w-100 z-999 top-0">
        <ul className="list ph0 ma0 nowrap">
          <NavLinkItem href="#" text="Home" />
          {"\n"}
          <NavLinkItem href="#projects" text="Projects" />
          {"\n"}
          <NavLinkItem href="#technologies" text="Technologies" />
          {"\n"}
          <NavLinkItem href="#timeline" text="Timeline" />
          {"\n"}
          <NavLinkItem href="#projecttable" text="Project Table" />
        </ul>
      </nav>
      <div className="pv2">&nbsp;</div>
    </div>
  );
}

function NavLink({ href, text }: { href: string; text: string }) {
  return (
    <Link className={link} href={href} scrollToTop={true}>
      {text}
    </Link>
  );
}

function NavItem({ children }: any) {
  return <li className="dib pa2">{children}</li>;
}

function NavLinkItem({ href, text }: { href: string; text: string }) {
  return (
    <NavItem>
      <NavLink href={href} text={text} />
    </NavItem>
  );
}