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

export interface Technology {
  name: string;
  projects: Project[];
  jobs: { company: string; title: string }[];
  experienceNet: number;
  experienceGross: number;
  yearStart: number;
  yearEnd: number;
}