import { createContext } from "react";

const ProjectColorContext = createContext<{(title: string) : string}>(null as any);

export default ProjectColorContext;