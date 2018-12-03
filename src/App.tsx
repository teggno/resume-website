import React from "react";
import TechnologiesView from "./app/TechnologiesView";
import HashAware from "./common/HashAware";
import { mainContainer, link } from "./css";
import Me from "./Me";
import { technologyRoute, projectRoute } from "./Routes";
import ProjectTableView from "./app/ProjectTableView";
import TimelineView from "./app/TimelineView";
import Link from "./common/Link";
import ProjectsView from "./app/ProjectsView";
import ProjectColorContext from "./app/ProjectColorContext";
import colors from "./Colors";

export default function App(props: { me: Me }) {
  const keyed = colors(props.me.projects().length).keyed;
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
                <ProjectsView
                  projects={props.me.projects()}
                  selectedProjectTitle={projectRoute.nameFromHash(hash)}
                />
              );
            } else if (hash.indexOf("#technologies") === 0) {
              return (
                <TechnologiesView
                  technologies={props.me.technologies()}
                  selectedTechnologyTitle={technologyRoute.nameFromHash(hash)}
                />
              );
            } else if (hash.indexOf("#timeline") === 0) {
              return <TimelineView me={props.me} />;
            } else if (hash.indexOf("#projecttable") === 0) {
              return <ProjectTableView me={props.me} />;
            } else {
              return (
                <div className="f1 tc">
                  Awesome, you made it here. This is the default screen, and I'm
                  not yet sure what to put here. So use the navigation at the
                  top left to get some useful information about me.
                </div>
              );
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
          <li className="dib pa2">
            <Link className={link} href="#projects" scrollToTop={true}>
              Projects
            </Link>
          </li>
          <li className="dib pa2">
            <Link className={link} href="#technologies" scrollToTop={true}>
              Technologies
            </Link>
          </li>
          {"\n"}
          <li className="dib pa2">
            <Link className={link} href="#timeline" scrollToTop={true}>
              Timeline
            </Link>
          </li>
          {"\n"}
          <li className="dib pa2">
            <Link className={link} href="#projecttable" scrollToTop={true}>
              Project Table
            </Link>
          </li>
        </ul>
      </nav>
      <div className="pv2">&nbsp;</div>
    </div>
  );
}
