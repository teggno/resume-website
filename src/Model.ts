import Period from "./Period";
import Month from "./Month";

export interface Project {
  title: string;
  description: string;
  period: Period;
  tasks?: string[];
  tools?: string[];
  products?: string[];
  teamSize: string;
  achievements?: string[];
  company?: string;
  technologies: {
    name: string;
    tasks?: string[];
  }[];
}

export interface Technology {
  name: string;
  projects: Project[];
  jobs: Job[];
  experienceNet: number;
  experienceGross: number;
  monthStart: Month;
  monthEnd: Month;
}

export interface Job {
  company: string;
  title: string;
}
