import React from "react";
import Filters from "./Filters";
import { Technology, TechnologyGroup } from "../Model";
import Link from "../common/Link";
import { link } from "../css";

export default function HomePage(props: {
  technologies: Technology[];
  onFiltersChange?: (technologies: Technology[], yearFrom: number) => void;
  selectedTechnologies: Technology[];
  yearFrom: number;
  technologyGroups?: TechnologyGroup[];
}) {
  return (
    <>
      <div className="bg-near-white pv4 pa5-ns">
        <div className="ph2 tc tj-ns mw6 center ma">
          <h3 className="f2 fw1 pa0 ma0 lh-copy">
            Hi, I'm Christian, the software developer you might want to work
            with.
          </h3>
          <p className="f3 lh-copy mb0">
            I've got quite a bit of experience in web and desktop development as
            well as in data related work. You can use this site to focus on
            what's relevant to you.
          </p>
        </div>
      </div>
      <div className="pt4 ph4-ns" style={{ height: 2000 }}>
        <Filters onChange={props.onFiltersChange} {...props} />
      </div>
    </>
  );
}
