import { Priorities } from "@/infrastructure/constants";

export const getPriorityObject: (
  priority: number
) => IPriorityObject = priority => {
  const priorityObject: IPriorityObject = {
    priority,
    text: "Обычная",
    color: "#00c853"
  };

  if (priority === Priorities.serious) {
    priorityObject.text = "Серьезная";
    priorityObject.color = "#ffd600";
  }

  if (priority === Priorities.critical) {
    priorityObject.text = "Критическая";
    priorityObject.color = "#d50000";
  }

  return priorityObject;
};

export interface IPriorityObject {
  priority: number;
  text: string;
  color: string;
}
