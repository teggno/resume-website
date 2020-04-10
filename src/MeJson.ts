// interfaces here mirror the JSON schema in resume.schema.json

export default interface MeJson {
  about?: About;
  jobs: Job[];
  projects: Project[];
  certificates?: Certificate[];
  technologyGroups?: TechnologyGroup[];
}

interface About {
  text?: string[];
  contactChannels?: {
    url: string;
    text?: string;
  }[];
}
interface Job {
  company: string;
  titles: { title: string; from?: string }[];
  period: Period;
}

interface Project {
  title: string;
  url?: string;
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

interface TechnologyGroup {
  groupName: string;
  technologies: string[];
}
