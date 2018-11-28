import React from "react";
import { render } from "react-dom";
import Me from "./Me";
import MeJson from "./MeJson";
import App from "./App";

fetch("me.json")
  .then(r => r.json() as any as MeJson)
  .then(meJson => {
    render(<App me={new Me(meJson)} />, document.getElementById("reactContainer"));
  });

