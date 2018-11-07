import Period from "./Period";

export interface Project {
  title: string;
  period: Period;
  tasks: string[];
  tools: string[];
  products?: string[];
  teamSize: string;
  achievements: string[];
  technologies: {
    name: string;
    tasks?: string[];
  }[]
}
