import React from "react";
import {
  listItem,
  listLink,
  listItemTitle,
  listItemSub,
} from "../css";

interface ListItemProps {
  title: string;
  href: string;
  sub: string;
}

export default function ListItem({ title, sub, href }: ListItemProps) {
  return (
    <li className={listItem} key={title}>
      <a href={href} className={listLink}>
        <div className={listItemTitle}>{title}</div>
        <div>
          <div className={listItemSub}>{sub}</div>
        </div>
      </a>
    </li>
  );
}
