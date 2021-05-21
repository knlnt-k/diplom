import { ROUTES } from "@/infrastructure/config/routes";
import { Accesses } from "@/infrastructure/constants";

export default [
  { type: "link", path: ROUTES.board.path, text: "Доска задач" },
  {
    type: "link",
    path: ROUTES.users.path,
    access: ROUTES.users.access,
    text: "Сотрудники"
  },
  {
    type: "link",
    path: ROUTES.reports.path,
    text: "Отчеты"
  },
  {
    type: "link",
    path: ROUTES.projects.path,
    text: "Проекты"
  },
  {
    type: "link",
    path: ROUTES.tasks.path,
    text: "Задачи"
  },
  {
    type: "button",
    name: "newTask",
    access(access) {
      return access === Accesses.task_editor || access === Accesses.admin;
    },
    text: "Новая задача"
  },
  {
    type: "button",
    name: "newProject",
    access(access) {
      return access === Accesses.admin;
    },
    text: "Новый проект",
    pathNameForVisible: ROUTES.projects.name
  }
] as INavItem[];

export interface INavItem {
  name?: "new-task";
  type: "link" | "button";
  path?: string;
  text?: string;
  access?: (access: number) => boolean;
  pathNameForVisible?: string;
}
