import React, { CSSProperties } from "react";
import { Technology, TechnologyGroup } from "../Model";
import Filters from "./Filters";

export default function HomePage(props: HomePageProps) {
  const filterDiv = React.createRef() as any;
  return (
    <div className="pa2" ref={filterDiv} id="filterDiv" style={props.style}>
      <Filters onChange={props.onFiltersChange} {...props} />
    </div>
  );
}

interface HomePageProps {
  technologies: Technology[];
  onFiltersChange?: (technologies: Technology[], yearFrom: number) => void;
  selectedTechnologies: Technology[];
  yearFrom: number;
  technologyGroups?: TechnologyGroup[];
  style?: CSSProperties;
}
