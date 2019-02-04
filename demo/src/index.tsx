import React from "react";
import { render } from "react-dom";
import App from "./App";
import { get } from "./http";
import { Me } from "resume-website";

const url = "sample.resume.json";
get(url, (err, responseText) => {
  if (err) {
    render(<FetchError />, document.getElementById("reactContainer"));
  } else {
    const meJson = JSON.parse(responseText);
    render(
      <App me={new Me(meJson)} />,
      document.getElementById("reactContainer")
    );
  }
});

function FetchError() {
  return (
    <div
      style={{
        color: "red",
        textAlign: "center",
        marginTop: "10%",
        fontSize: "2rem"
      }}
    >
      Error fetching resume JSON at {url}.
    </div>
  );
}
