import Period from "./Period";
import Month from "./Month";
import Duration from "./Duration";

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
  industry?: string;
  duration: (now: Date) => Duration;
  technologies: {
    name: string;
    tasks?: string[];
  }[];
}

export interface Technology {
  name: string;
  projects: Project[];
  jobs: {
    company: string;
    title: string;
  }[];
  experienceNet: number;
  experienceGross: number;
  monthStart: Month;
  monthEnd: Month;
}

export interface Job{
  company: string;
  titles: {
    title: string;
    period: Period;
  }[],
  period: Period;
}

export interface Certificate {
  name: string;
  date: string;
}