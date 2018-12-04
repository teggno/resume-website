import Month from "./Month";
import Period from "./Period";
import MeJson from "./MeJson";
import {
  flatten,
  groupBy,
  minBy,
  maxBy,
  values,
  innerJoin,
  mapAccum,
  descend,
  sort,
  propOr
} from "ramda";

const now = new Date();
const todaysMonth = new Month(now.getFullYear(), now.getMonth() + 1);

export default class Me {
  constructor(private source: MeJson) {}

  projects() {
    return this.getProjects();
  }

  jobs() {
    return this.getJobs();
  }

  certificates() {
    return this.source.certificates || [];
  }

  technologies() {
    const projects = this.getProjects();
    const jobs = this.getJobs();
    const jobsAndTitles = flatten(
      jobs.map(j => j.titles.map(t => ({ job: j, title: t })))
    );
    const pairs = flatten(
      projects.map(p =>
        p.technologies.map(t => ({ project: p, technology: t }))
      )
    );
    const grouped = groupBy(p => p.technology.name, pairs);
    const technologies = Object.keys(grouped).map(name => {
      const pairs = grouped[name];
      const projectsWhereTechWasUsed = pairs.map(g => g.project);
      const minMonth = projectsWhereTechWasUsed
        .map(p => p.period.from)
        .reduce(
          (prev, current) =>
            prev === null ? current : minBy(Month.totalMonths, prev, current),
          Month.maxValue
        );
      const maxMonth = projectsWhereTechWasUsed
        .map(p => p.period.to || todaysMonth)
        .reduce(
          (prev, current) =>
            prev === null ? current : maxBy(Month.totalMonths, prev, current),
          Month.minValue
        );

      return {
        name: name,
        monthStart: minMonth,
        monthEnd: maxMonth,
        experienceNet:
          projectsWhereTechWasUsed
            .map(p => Month.diff(p.period.from, p.period.to || todaysMonth))
            .reduce((prev, current) => prev + current, 0) / 12,
        experienceGross: Month.diff(minMonth, maxMonth) / 12,
        projects: projectsWhereTechWasUsed,
        jobs: values(
          groupBy(
            jt => jt.job.company,
            innerJoin(
              (jt, p) => jt.title.period.overlaps(p.period),
              jobsAndTitles,
              projectsWhereTechWasUsed
            )
          )
        ).map(g => ({ company: g[0].job.company, title: g[0].title.title }))
      };
    });

    return technologies.sort((a, b) =>
      a.name === b.name ? 0 : a.name > b.name ? -1 : 1
    );
  }
  private getProjects() {
    return this.source.projects.map(s => {
      const period = new Period(
        Month.parse(s.period.from),
        s.period.to ? Month.parse(s.period.to) : undefined
      );
      return {
        period: period,
        title: <string>s.title,
        company: <string>s.company,
        industry: s.industry,
        technologies: <{ name: string; tasks?: string[] }[]>(
          s.technologies.map(t =>
            typeof t === "string"
              ? { name: t }
              : { name: t.name, tasks: t.tasks }
          )
        ),
        description: <string>s.description,
        teamSize: <string>s.teamSize,
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
      company: <string>j.company,
      titles: mapAccum(
        (to, titleItem) => [
          Month.parse(titleItem.from ? titleItem.from : j.period.from).add(-1),
          {
            title: titleItem.title,
            period: new Period(
              Month.parse(titleItem.from ? titleItem.from : j.period.from),
              to
            )
          }
        ],
        j.period.to ? Month.parse(j.period.to) : undefined,
        sort(descend(<any>propOr("", "from")), j.titles)
      )[1],
      period: new Period(
        Month.parse(j.period.from),
        j.period.to ? Month.parse(j.period.to) : undefined
      )
    }));
  }
}
