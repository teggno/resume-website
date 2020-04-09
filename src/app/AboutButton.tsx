import React from "react";
import "./AboutButton.css";

export default function AboutButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="bn aboutButton pointer bg-adwise-red white pv2 ph4"
    >
      About
    </button>
  );
}
