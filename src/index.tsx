import * as React from "react";
import * as ReactDOM from "react-dom";
import "./base.css";

import { TechnologiesView } from "./components/TechnologiesView";

fetch("me.json")
  .then(r => r.json())
  .then(me => {

    ReactDOM.render(<TechnologiesView me={me}/>, document.getElementById("example"));
  });
