import { Pagination, Sort } from "@/infrastructure/i-external";

export interface Task {
  id?: number;
  name: string;
  description?: string;
  user_id?: number;
  priority?: number;
  project_id: number;
  company_id: number;
  status?: number;
  created?: number;
}

export type RequestCreateTask = Task;
export interface ResponseCreateTask {
  data: {
    id: number;
  };
}

export type RequestUpdateTask = Task;
export type ResponseUpdateTask = ResponseCreateTask;

export interface RequestGetTasks {
  ids: number[];
  filter: {
    text?: string;
    user_ids?: number[];
    priorities?: number[];
    project_ids?: number[];
    company_ids: number[];
    statuses?: number[];
  };
  sort?: Sort;
  pagination?: Pagination;
}
export interface ResponseGetTasks {
  data: {
    tasks: Task[];
    total: number;
  };
}

export interface RequestDeleteTask {
  ids: number[];
}
export interface ResponseDeleteTask {
  data: {
    ids: number[];
  };
}

export interface RequestChangeStatusTask {
  id: number;
  status: number;
}

export interface ResponseChangeStatusTask {
  data: {
    id: number;
  };
}
