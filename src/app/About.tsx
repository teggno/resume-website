import React, { useState, useRef } from "react";
import AboutButton from "./AboutButton";
import "./About.css";
import { CSSTransition } from "react-transition-group";
import useClickOutside from "../common/useClickOutside";

export default function About({ content }: AboutProps) {
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
            {content.text?.map((t) => (
              <p className="ph3 lh-copy mt0">{t}</p>
            ))}
            {content.contactChannels ? (
              <div className="ph3 lh-copy">
                <div>Contact me</div>
                {content.contactChannels.map((c) => (
                  <a
                    className="nowrap pr2 link underline-hover darker-green"
                    href={c.url}
                    target="_blank"
                  >
                    {c.text === undefined || c.text === null || c.text === ""
                      ? c.url
                      : c.text}
                  </a>
                ))}
              </div>
            ) : null}

            <p className="pa3 bg-near-white mb0 mid-gray">
              This site was built using React and TypeScript.
            </p>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

interface AboutProps {
  content: {
    text?: string[];
    contactChannels?: { url: string; text?: string }[];
  };
}
