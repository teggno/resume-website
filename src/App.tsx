import React from "react";
import { TechnologiesView } from "./app/TechnologiesView";
import HashAware from "./common/HashAware";
import { mainContainer } from "./css";
import Me from "./Me";
import { technologyRoute } from "./Routes";
import ProjectTableView from "./app/ProjectTableView";
import TimelineView from "./app/TimelineView";

export default function App(props: { me: Me }) {
  return (
    <div className={mainContainer}>
      <Navigation />
      <HashAware>
        {(hash: string) => {
          if (hash.indexOf("#technologies") === 0) {
            return (
              <TechnologiesView
                technologies={props.me.technologies()}
                selectedTechnologyName={technologyRoute.nameFromHash(hash)}
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
                not yet sure what to put here. So use the navigation at the top
                left to get some useful information about me.
              </div>
            );
          }
        }}
      </HashAware>
    </div>
  );
}

function Navigation() {
  return (
    <nav>
      <ul className="list pa2 ma0">
        <li className="dib">
          <a className="link" href="#technologies">
            Technologies
          </a>
        </li>
        {"\n"}
        <li className="dib">
          <a className="link" href="#timeline">
            Timeline
          </a>
        </li>
        {"\n"}
        <li className="dib">
          <a className="link" href="#projecttable">
            Project Table
          </a>
        </li>
      </ul>
    </nav>
  );
}
