import React from "react";
import { Technology } from "../Model";
import TechnologyDetails from "./TechnologyDetails";
import { MasterDetail } from "../common/MasterDetail";
import SortableTechList from "./SortableTechList";

export function TechnologiesView(props: TechnologiesViewProps) {
  console.debug("TechnologiesView render");
  const selectedTechnology = props.technologies.filter(
    t => t.name === props.selectedTechnologyName
  )[0];
  return (
    <MasterDetail
      backToListRoute={"#technologies"}
      detailsVisible={!!selectedTechnology}
      master={<SortableTechList technologies={props.technologies} />}
      detail={<TechnologyDetails technology={selectedTechnology} />}
    />
  );
}


interface TechnologiesViewProps {
  technologies: Technology[];
  selectedTechnologyName?: string;
}
