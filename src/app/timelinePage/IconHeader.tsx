import React from "react";

export default function IconHeader({
  title,
  children
}: {
  title: string;
  children: any;
}) {
  return (
    <div className="tc">
      <div className="h1 h2-ns w1 w2-ns dib v-mid">{children}</div>
      <div className="ph1 ph2-ns dib v-mid">{title}</div>
    </div>
  );
}
