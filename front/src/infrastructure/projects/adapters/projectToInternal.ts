import { IProject } from "@/infrastructure/projects/i-internal";
import { Project } from "@/infrastructure/projects/i-external";
import { timestampToDate } from "@/infrastructure/services/timestamp-to-date";

export const projectToInternal: (project: Project) => IProject = project => {
  const { id, name, description, company_id, created } = project;

  return {
    id: id || 0,
    name,
    description: description || "",
    companyID: company_id,
    created: created ? timestampToDate(created * 1000) : ""
  } as IProject;
};
