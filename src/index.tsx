import React from "react";
import { render } from "react-dom";
import App from "./app/App";
import Me from "./Me";
import { get } from "./http";

const url = "my.resume.json";
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
