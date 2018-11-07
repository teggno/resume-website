import * as R from "ramda";
import Month from "./Month";
import Period from "./Period";

const now = new Date();
const todaysMonth = new Month(now.getFullYear(), now.getMonth() + 1);

export default class Me {
  constructor(private source: any) {}

  technologies() {
    const projects = this.getProjects();
    const jobs = this.getJobs();
    const jobsAndTitles = R.flatten(
      jobs.map(j => j.titles.map(t => ({ job: j, title: t })))
    );
    const pairs = R.flatten(
      projects.map(p =>
        p.technologies.map(t => ({ project: p, technology: t }))
      )
    );
    const grouped = R.groupBy(p => p.technology.name, pairs);
    const technologies = Object.keys(grouped).map(name => {
      const pairs = grouped[name];
      const projectsWhereTechWasUsed = pairs.map(g => g.project);
      const minMonth = projectsWhereTechWasUsed
        .map(p => p.period.from)
        .reduce(
          (prev, current) =>
            prev === null ? current : R.minBy(Month.totalMonths, prev, current),
          Month.maxValue
        );
      const maxMonth = projectsWhereTechWasUsed
        .map(p => p.period.to || todaysMonth)
        .reduce(
          (prev, current) =>
            prev === null ? current : R.maxBy(Month.totalMonths, prev, current),
          Month.minValue
        );

      return {
        name: name,
        yearStart: minMonth.year,
        yearEnd: maxMonth.year,
        experienceNet: Math.round(
          projectsWhereTechWasUsed
            .map(
              p =>
                (p.period.to || todaysMonth).totalMonths() -
                p.period.from.totalMonths()
            )
            .reduce((prev, current) => prev + current, 0) / 12
        ),
        experienceGross: Math.round(
          (maxMonth.totalMonths() - minMonth.totalMonths()) / 12
        ),
        projects: projectsWhereTechWasUsed,
        jobs: R.values(
          R.groupBy(
            jt => jt.job.company,
            R.innerJoin(
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
  getProjects() {
    return R.values(this.source.projects).map(s => ({
      period: new Period(
        Month.parse(s.period.from),
        s.period.to ? Month.parse(s.period.to) : undefined
      ),
      title: <string>s.title,
      technologies: <{ name: string; tasks?: string[] }[]>(
        s.technologies.map((t: any) =>
          typeof t === "string" ? { name: t } : { name: t.name, tasks: t.tasks }
        )
      ),
      teamSize: <string>s.teamSize,
      achievements: <string[]>s.achievements,
      tasks: <string[]>s.tasks,
      products: <string[]>s.products,
      tools: <string[]>s.tools
    }));
  }

  private getJobs() {
    return R.values(this.source.jobs).map(j => ({
      company: <string>j.company,
      titles: R.mapAccum(
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
        R.sort(R.descend(<any>R.propOr("", "from")), <
          {
            title: string;
            from?: string;
          }[]
        >j.titles)
      )[1],
      period: new Period(
        Month.parse(j.period.from),
        j.period.to ? Month.parse(j.period.to) : undefined
      )
    }));
  }
}
