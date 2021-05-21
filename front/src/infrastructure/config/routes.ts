import { Accesses } from "@/infrastructure/constants";

export const ROUTES = {
  defaultLayout: {
    name: "default-layout",
    path: "/"
  },
  home: {
    name: "home-page",
    path: ""
  },
  board: {
    name: "board-page",
    path: "/board"
  },
  users: {
    name: "users-page",
    path: "/users",
    access(access: number) {
      return access === Accesses.admin;
    }
  },
  reports: {
    name: "reports-page",
    path: "/reports"
  },
  projects: {
    name: "projects-page",
    path: "/projects"
  },
  tasks: {
    name: "tasks-page",
    path: "/tasks"
  }
};
