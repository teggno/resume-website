import React from "react";
import { technologyRoute } from "../Routes";
import Link from "../common/Link";
import { link } from "../css";

export default function HomePage() {
  return (
    <div className="f2 tc">
      <p>
        Hi, I'm Christian. I'm a developer who likes frontend and backend. I'm
        really good at{" "}
        <Link className={link} href={technologyRoute.hashFromName("c#")}>
          c#
        </Link>
        ,{" "}
        <Link
          className={link}
          href={technologyRoute.hashFromName("JavaScript")}
        >
          JavaScript
        </Link>
        ,{" "}
        <Link
          className={link}
          href={technologyRoute.hashFromName("TypeScript")}
        >
          TypeScript
        </Link>{" "}
        and{" "}
        <Link className={link} href={technologyRoute.hashFromName("T-SQL")}>
          SQL
        </Link>
        .
      </p>
      <p>
        When I was confronted with the tedious task of updating my resume yet
        another time I decided that, instead of using my doubtful prose writing
        skills, I'd better write down all my experience in a more structured way
        and make it available in a website which itself showcases how I do
        things.
      </p>
    </div>
  );
}
