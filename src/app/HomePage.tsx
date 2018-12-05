import React from "react";
import TechnologyFilters from "./TechnologyFilters";
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
      <TechnologyFilters onChange={props.onFiltersChange} {...props} />
    </div>
  );
}
