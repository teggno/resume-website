import React from "react";
import { bigButton } from "../css";

export default function Welcome({ onHide: hidden }: { onHide: () => void }) {
  return (
    <div className="bg-near-white flex vh-100 w-100 items-center justify-center fixed left-0 top-0 z-999">
      <div className="ph2 tc tj-ns mw6">
        <h3 className="f2 normal pa0 ma0 lh-copy">
          Hi, I'm Christian, the software developer you might want to work with.
        </h3>
        <p className="f3 lh-copy mb0">
          I've got quite a bit of experience in web and desktop development as
          well as in data related work.
        </p>
        <div className="pt5 tc">
          <a
            href="#filterDiv"
            className={bigButton}
            onClick={(e) => {
              hidden();
              e.preventDefault();
            }}
          >
            Find out how I can help you
          </a>
        </div>
      </div>
    </div>
  );
}
