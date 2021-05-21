import { Priorities } from "@/infrastructure/constants";

export const getPriorityObject: (
  priority: number
) => IPriorityObject = priority => {
  const priorityObject: IPriorityObject = {
    priority,
    text: "Обычная",
    color: "#a5d6a7"
  };

  if (priority === Priorities.serious) {
    priorityObject.text = "Серьезная";
    priorityObject.color = "#fff176";
  }

  if (priority === Priorities.critical) {
    priorityObject.text = "Критическая";
    priorityObject.color = "#ef5350";
  }

  return priorityObject;
};

export interface IPriorityObject {
  priority: number;
  text: string;
  color: string;
}
