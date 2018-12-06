import React from "react";
import Filters from "./Filters";
import { Technology, TechnologyGroup } from "../Model";

export default function HomePage(props: {
  technologies: Technology[];
  onFiltersChange?: (technologies: Technology[], yearFrom: number) => void;
  selectedTechnologies: Technology[];
  yearFrom: number;
  technologyGroups?: TechnologyGroup[];
}) {
  return (
    <div>
      <Filters onChange={props.onFiltersChange} {...props} />
    </div>
  );
}
