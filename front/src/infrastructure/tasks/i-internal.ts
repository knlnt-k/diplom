import { IPriorityObject } from "@/infrastructure/services/get-priority-object";
import { IStatusObject } from "@/infrastructure/services/get-status-object";
import { ITimeObject } from "@/infrastructure/i-internal";

export interface ITask {
  id: number;
  name: string;
  description: string;
  userID: number;
  priority: IPriorityObject;
  projectID: number;
  companyID: number;
  status: IStatusObject;
  created: ITimeObject;
  closed: ITimeObject;
}

export const taskSortFields = [
  { text: "Название", field: "name" },
  { text: "Приоритет", field: "priority" },
  { text: "Проект", field: "project_id" },
  { text: "Статус", field: "status" },
  { text: "Дата", field: "created" }
];
