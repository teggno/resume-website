// interfaces here mirror the JSON schema in resume.schema.json

export default interface MeJson {
  jobs: Job[];
  projects: Project[];
  certificates?: Certificate[];
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

interface Certificate {
  date: string;
  name: string;
}