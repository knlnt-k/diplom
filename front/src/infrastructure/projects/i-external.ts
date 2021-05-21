import { Pagination, Sort } from "@/infrastructure/i-external";

export interface Project {
  id?: number;
  name: string;
  description?: string;
  company_id: number;
  created?: number;
}

export type RequestCreateProject = Project;

export interface ResponseCreateProject {
  data: {
    id: number;
  };
}

export type RequestUpdateProject = Project;

export type ResponseUpdateProject = ResponseCreateProject;

export interface RequestGetProjects {
  ids: number[];
  filter: {
    text?: string;
    company_ids: number[];
  };
  sort?: Sort;
  pagination?: Pagination;
}

export interface ResponseGetProjects {
  data: {
    projects: Project[];
    total: number;
  };
}

export interface RequestDeleteProjects {
  ids: number[];
}

export interface ResponseDeleteProjects {
  data: {
    ids: number[];
  };
}
