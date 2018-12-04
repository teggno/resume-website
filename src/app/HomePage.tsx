import React from "react";
import TechnologyFilters from "./TechnologyFilters";
import { Technology } from "../Model";

export default function HomePage({
  technologies,
  onFiltersChange,
  selectedTechnologies,
  yearFrom
}: {
  technologies: Technology[];
  onFiltersChange?: (technologies: Technology[], yearFrom: number) => void;
  selectedTechnologies: Technology[];
  yearFrom: number;
}) {
  return (
    <div>
      <TechnologyFilters
        technologies={technologies}
        onChange={onFiltersChange}
        selectedTechnologies={selectedTechnologies}
        yearFrom={yearFrom}
      />
    </div>
  );
}
