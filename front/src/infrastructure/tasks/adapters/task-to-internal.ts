import { Task } from "@/infrastructure/tasks/i-external";
import { ITask } from "@/infrastructure/tasks/i-internal";
import { Priorities, StatusesTask } from "@/infrastructure/constants";
import {
  timestampToDate,
  dateToString
} from "@/infrastructure/services/timestamp-to-date";
import { getPriorityObject } from "@/infrastructure/services/get-priority-object";
import { getStatusObject } from "@/infrastructure/services/get-status-object";

export const TaskToInternal: (task: Task) => ITask = task => ({
  id: task.id || 0,
  name: task.name,
  description: task.description || "",
  userID: task.user_id || 0,
  priority: getPriorityObject(task.priority || Priorities.normal),
  projectID: task.project_id,
  companyID: task.company_id,
  status: getStatusObject(task.status || StatusesTask.canDo),
  created: {
    seconds: task.created || 0,
    getString(format: string): string {
      return dateToString(format, timestampToDate(this.seconds * 1000));
    }
  }
});
