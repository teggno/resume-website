import * as React from "react";
import * as ReactDOM from "react-dom";

import { TechnologiesView } from "./components/TechnologiesView";
import { mainContainer } from "./css";

fetch("me.json")
  .then(r => r.json())
  .then(me => {
    ReactDOM.render(
      <div className={mainContainer}>
        <TechnologiesView me={me} />
      </div>,
      document.getElementById("reactContainer")
    );
  });
