import React from "react";
import { render } from "react-dom";

import { TechnologiesView } from "./components/TechnologiesView";
import { mainContainer } from "./css";
import Me from "./Me";
import HashAware from "./components/HashAware";
import TimelineView from "./components/TimelineView";
import { technologyRoute } from "./Routes";
import MeJson from "./MeJson";

fetch("me.json")
  .then(r => r.json() as any as MeJson)
  .then(meJson => {
    render(<App me={new Me(meJson)} />, document.getElementById("reactContainer"));
  });

function App(props: { me: Me }) {
  return (
    <div className={mainContainer}>
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
        </ul>
      </nav>
      <HashAware>
        {(hash: string) =>
          hash.indexOf("timeline") !== -1 ? (
            <TimelineView me={props.me} />
          ) : (
            <TechnologiesView
              technologies={props.me.technologies()}
              selectedTechnologyName={technologyRoute.nameFromHash(hash)}
            />
          )
        }
      </HashAware>
    </div>
  );
}
