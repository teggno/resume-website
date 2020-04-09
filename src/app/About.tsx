import React, { useState, useRef } from "react";
import AboutButton from "./AboutButton";
import "./About.css";
import { CSSTransition } from "react-transition-group";
import useClickOutside from "../common/useClickOutside";

export default function About() {
  const [aboutVisible, setAboutVisible] = useState(false);
  const ref = useRef(null);
  useClickOutside(() => {
    setAboutVisible(false);
  }, ref);
  return (
    <CSSTransition timeout={600} in={aboutVisible} classNames="about">
      <div className="about" ref={ref}>
        <div className="relative">
          <AboutButton onClick={() => setAboutVisible(!aboutVisible)} />
          <div className="pt3 shadow-5 z-999 aboutContent relative bg-white w5">
            <p className="ph3 lh-copy mt0">
              This site shows the software development experience of me,
              Christian Bär.
            </p>
            <p className="ph3 lh-copy">You can hire me as a contractor.</p>
            <p className="ph3 lh-copy mb0">
              Contact me{" "}
              <a className="nowrap" href="mailto:info@adwise.ch">
                by Email
              </a>{" "}
              or{" "}
              <a
                className="nowrap"
                target="_blank"
                href="https://linkedin.com/in/christianbaeradwise"
              >
                via LinkedIn
              </a>
              .
            </p>
            <p className="pa3 bg-near-white mb0 mid-gray">
              This site was built using React and TypeScript.
            </p>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
