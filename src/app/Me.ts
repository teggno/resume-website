import Month from "./Month";
import Period from "./Period";
import MeJson from "./MeJson";
import {
  groupBy,
  minBy,
  maxBy,
  mapAccum,
  descend,
  sort,
  propOr,
  chain,
  add
} from "ramda";
import { Project, Job, Certificate, Technology, TechnologyGroup } from "./Model";

const todaysMonth = Month.fromDate(new Date());

export default class Mrefere {
  constructor(private source: MeJson) {}

  projects() : Project[] {
    return this.getProjects();
  }

  jobs(): Job[] {
    return this.getJobs();
  }

  certificates(): Certificate[] {
    return this.source.certificates || [];
  }

  technologyGroups(): TechnologyGroup[] {
    return this.source.technologyGroups || [];
  }

  technologies(): Technology[] {
    const projects = this.getProjects(),
      pairs = chain(
        p => p.technologies.map(t => ({ project: p, technology: t })),
        projects
      ),
      grouped = groupBy(p => p.technology.name, pairs),
      technologies = Object.keys(grouped).map(name => {
        const pairs = grouped[name],
          projectsWhereTechWasUsed = pairs.map(g => g.project),
          minMonth = projectsWhereTechWasUsed.reduce(
            (prev, current) =>
              minBy(Month.totalMonths, prev, current.period.from),
            Month.maxValue
          ),
          maxMonth = projectsWhereTechWasUsed.reduce(
            (prev, current) =>
              maxBy(Month.totalMonths, prev, current.period.to || todaysMonth),
            Month.minValue
          );

        return {
          name: name,
          monthStart: minMonth,
          monthEnd: maxMonth,
          experienceNet:
            projectsWhereTechWasUsed
              .map(p => Month.diff(p.period.from, p.period.to || todaysMonth))
              .reduce(add, 0) / 12,
          experienceGross: Month.diff(minMonth, maxMonth) / 12,
          projects: projectsWhereTechWasUsed
        };
      });

    return technologies;
  }
  private getProjects() {
    return this.source.projects.map(s => {
      const period = parse(s.period);
      return {
        period: period,
        title: s.title,
        company: s.company,
        industry: s.industry,
        technologies: <{ name: string; tasks?: string[] }[]>(
          s.technologies.map(t =>
            typeof t === "string"
              ? { name: t }
              : { name: t.name, tasks: t.tasks }
          )
        ),
        description: s.description,
        teamSize: s.teamSize,
        achievements: <string[]>s.achievements,
        tasks: <string[]>s.tasks,
        products: <string[]>s.products,
        tools: <string[]>s.tools,
        duration: (now: Date) =>
          period.from.durationUntil(period.to || Month.fromDate(now))
      };
    });
  }

  private getJobs() {
    return this.source.jobs.map(j => ({
      company: j.company,
      titles: mapAccum(
        (to, titleItem) => [
          Month.parse(titleItem.from || j.period.from).add(-1),
          {
            title: titleItem.title,
            period: new Period(
              Month.parse(titleItem.from || j.period.from),
              to
            )
          }
        ],
        j.period.to ? Month.parse(j.period.to) : undefined,
        sort(descend(<any>propOr("", "from")), j.titles)
      )[1],
      period: parse(j.period)
    }));
  }
}

function parse(src: { from: string; to?: string }) {
  return new Period(
    Month.parse(src.from),
    src.to ? Month.parse(src.to) : undefined
  );
}
