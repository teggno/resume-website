import { list, stripedStringList } from "../css";
import React from "react";

export default function StringList({ items }: { items: string[] }) {
  return (
    <ul className={list}>
      {items.map((x, i) => (
        <li className={stripedStringList} key={i}>
          {x}
        </li>
      ))}
    </ul>
  );
}
