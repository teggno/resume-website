import React from "react";
import { iconInText } from "../../css";

export default function IconHeader({
  title,
  children
}: {
  title: string;
  children: any;
}) {
  return (
    <div className="tc">
      <div className={iconInText}>{children}</div>
      <div className="ph1 ph2-ns dib v-mid">{title}</div>
    </div>
  );
}
