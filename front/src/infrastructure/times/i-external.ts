import { Sort } from "@/infrastructure/i-external";

export interface Times {
  id?: number;
  task_id: number;
  user_id: number;
  time: number;
  created?: number;
}

export type RequestSetTime = Times;
export interface ResponseSetTime {
  data: {
    id: number;
  };
}

export type RequestUpdateTime = Times;
export type ResponseUpdateTime = ResponseSetTime;

export interface RequestGetTimes {
  filter?: {
    task_ids?: number[];
    user_ids?: number[];
  };
  sort?: Sort;
}
export interface ResponseGetTimes {
  data: {
    times: Times[];
  }
}
