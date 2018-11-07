import * as React from "react";

export function TechnologyList(props: TechnologyListProps) {
  return (
    <ul>
      {props.technologies.map(t => (
        <li key={t.name}>
          <h3>{t.name}</h3>
          <div>
            {t.projects.length} projects in {t.jobs.length} jobs over{" "}
            {t.experienceGross} years ({`${t.yearStart}-${t.yearEnd}`}
            ).
          </div>
          <div>
            Projects:
            <ul>
              {t.projects.map(p => (
                <li key={p.title}>{p.title}</li>
              ))}
            </ul>
          </div>
          <div>
            Jobs:
            <ul>
              {t.jobs.map((j, i) => (
                <li key={i}>
                  {j.title} at {j.company}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}

export interface TechnologyListProps {
  technologies: Technology[];
}

export interface Technology {
  name: string;
  projects: { title: string }[];
  jobs: { company: string; title: string }[];
  experienceNet: number;
  experienceGross: number;
  yearStart: number;
  yearEnd: number;
}
