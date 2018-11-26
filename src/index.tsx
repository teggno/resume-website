import React from "react";
import * as ReactDOM from "react-dom";

import { TechnologiesView } from "./components/TechnologiesView";
import { mainContainer } from "./css";
import Me from "./Me";
import HashAware from "./components/HashAware";
import TimelineView from "./components/TimelineView";

fetch("me.json")
  .then(r => r.json())
  .then(me => {
    ReactDOM.render(
      <div className={mainContainer}>
        <HashAware extractRelevantPart={hash => hash.split("/")[0]}>
          {(hash: string) =>
            hash.indexOf("timeline") !== -1 ? (
              <TimelineView me={new Me(me)} />
            ) : (
              <TechnologiesView technologies={new Me(me).technologies()} />
            )
          }
        </HashAware>
      </div>,
      document.getElementById("reactContainer")
    );
  });
