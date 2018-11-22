import React from "react";
import * as ReactDOM from "react-dom";

import { TechnologiesView } from "./components/TechnologiesView";
import { mainContainer } from "./css";
import Me from "./Me";

fetch("me.json")
  .then(r => r.json())
  .then(me => {
    ReactDOM.render(
      <div className={mainContainer}>
        <TechnologiesView technologies={new Me(me).technologies()} />
      </div>,
      document.getElementById("reactContainer")
    );
  });
