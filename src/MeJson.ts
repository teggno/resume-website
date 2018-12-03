import { string } from "prop-types";

// interfaces here mirror the JSON schema in me.schema.json

export default interface MeJson {
  jobs: Job[];
  projects: Project[];
}

interface Job {
  company: string;
  titles: { title: string; from?: string }[];
  period: Period;
}

interface Project {
  title: string;
  description: string;
  company?: string;
  industry?: string;
  tools?: string[];
  tasks: string[];
  teamSize: string;
  period: Period;
  technologies: {
    name: string;
    tasks: string[];
  }[];
  products?: string[];
  achievements?: string[];
}

interface Period {
  from: string;
  to?: string;
}
