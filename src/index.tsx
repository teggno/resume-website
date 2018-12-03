import React from "react";
import { render } from "react-dom";
import App from "./App";
import Me from "./Me";
import MeJson from "./MeJson";

fetch("my.resume.json")
  .then(r => r.json() as any as MeJson)
  .then(meJson => {
    render(<App me={new Me(meJson)} />, document.getElementById("reactContainer"));
  });

