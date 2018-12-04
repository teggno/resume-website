import React from "react";
import ProjectColorContext from "./app/ProjectColorContext";
import ProjectsPage from "./app/ProjectsPage";
import ProjectTablePage from "./app/ProjectTablePage";
import TechnologiesPage from "./app/TechnologiesPage";
import TimelinePage from "./app/TimelinePage";
import colors from "./Colors";
import HashAware from "./common/HashAware";
import Link from "./common/Link";
import { link, mainContainer } from "./css";
import Me from "./Me";
import { projectRoute, technologyRoute } from "./Routes";
import HomePAge from "./app/HomePage";

export default function App({ me }: { me: Me }) {
  const keyed = colors(me.projects().length).keyed;
  return (
    <div className={mainContainer}>
      <ProjectColorContext.Provider
        value={(title: string) => keyed(title) || "cyan"}
      >
        <Navigation />
        <HashAware>
          {(hash: string) => {
            if (hash.indexOf("#projects") === 0) {
              return (
                <ProjectsPage
                  projects={me.projects()}
                  selectedProjectTitle={projectRoute.nameFromHash(hash)}
                />
              );
            } else if (hash.indexOf("#technologies") === 0) {
              return (
                <TechnologiesPage
                  technologies={me.technologies()}
                  selectedTechnologyTitle={technologyRoute.nameFromHash(hash)}
                />
              );
            } else if (hash.indexOf("#timeline") === 0) {
              return <TimelinePage me={me} />;
            } else if (hash.indexOf("#projecttable") === 0) {
              return <ProjectTablePage me={me} />;
            } else {
              return <HomePAge />;
            }
          }}
        </HashAware>
      </ProjectColorContext.Provider>
    </div>
  );
}

function Navigation() {
  return (
    <div>
      <nav className="fixed bg-white w-100 z-999 top-0">
        <ul className="list ph0 ma0">
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
