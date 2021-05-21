import {
  TOKEN,
  TOKEN_NAME,
  TOKEN_STRING
} from "@/infrastructure/config/config";
import {
  AuthRequest,
  SignInUserRequest,
  SignUpCompanyRequest,
  SignUpUserRequest
} from "@/infrastructure/auth/i-external";
import { GetCompaniesRequest } from "@/infrastructure/companies/i-external";
import { ROUTES } from "@/infrastructure/config/routes";
import {
  RequestCreateProject,
  RequestDeleteProjects,
  RequestGetProjects,
  RequestUpdateProject
} from "@/infrastructure/projects/i-external";
import {
  RequestCreateTask,
  RequestDeleteTask,
  RequestGetTasks,
  RequestUpdateTask
} from "@/infrastructure/tasks/i-external";
import { RequestGetUsers } from "@/infrastructure/users/i-external";
import {
  RequestGetTimes,
  RequestSetTime,
  RequestUpdateTime
} from "@/infrastructure/times/i-external";

export default class Infrastructure {
  static auth = {
    signUpCompany(data: SignUpCompanyRequest) {
      return import("@/infrastructure/auth/auth-rest").then(module =>
        module.default.signUpCompany(data)
      );
    },
    signInCompany(data: AuthRequest) {
      return import("@/infrastructure/auth/auth-rest").then(module =>
        module.default.signInCompany(data)
      );
    },
    signUpUser(data: SignUpUserRequest) {
      return import("@/infrastructure/auth/auth-rest").then(module =>
        module.default.signUpUser(data)
      );
    },
    signInUser(data: SignInUserRequest) {
      return import("@/infrastructure/auth/auth-rest").then(module =>
        module.default.signInUser(data)
      );
    },
    isAuth() {
      return !!(TOKEN && TOKEN.exp > Math.floor(new Date().getTime() / 1000));
    },
    setToken(token: string) {
      localStorage.setItem(TOKEN_NAME, token);
    },
    unAuth() {
      if (TOKEN_STRING) localStorage.removeItem(TOKEN_NAME);
      window.location.href = ROUTES.defaultLayout.path;
    },
    isCompany() {
      return !!TOKEN?.isCompany;
    }
  };

  static companies = {
    getCompanies(request: GetCompaniesRequest) {
      return import("@/infrastructure/companies/companies-rest").then(module =>
        module.default.getCompanies(request)
      );
    }
  };

  static projects = {
    getProjects(request: RequestGetProjects) {
      return import("@/infrastructure/projects/projects-rest").then(module =>
        module.default.getProjects(request)
      );
    },
    createProject(request: RequestCreateProject) {
      return import("@/infrastructure/projects/projects-rest").then(module =>
        module.default.createProject(request)
      );
    },
    deleteProjects(request: RequestDeleteProjects) {
      return import("@/infrastructure/projects/projects-rest").then(module =>
        module.default.deleteProjects(request)
      );
    },
    updateProject(request: RequestUpdateProject) {
      return import("@/infrastructure/projects/projects-rest").then(module =>
        module.default.updateProject(request)
      );
    }
  };

  static tasks = {
    createTask(request: RequestCreateTask) {
      return import("@/infrastructure/tasks/tasks-rest").then(module =>
        module.default.createTask(request)
      );
    },
    getTasks(request: RequestGetTasks) {
      return import("@/infrastructure/tasks/tasks-rest").then(module =>
        module.default.getTasks(request)
      );
    },
    updateTask(request: RequestUpdateTask) {
      return import("@/infrastructure/tasks/tasks-rest").then(module =>
        module.default.updateTask(request)
      );
    },
    deleteTasks(request: RequestDeleteTask) {
      return import("@/infrastructure/tasks/tasks-rest").then(module =>
        module.default.deleteTasks(request)
      );
    }
  };

  static users = {
    getUsers(request: RequestGetUsers) {
      return import("@/infrastructure/users/users-rest").then(module =>
        module.default.getUsers(request)
      );
    }
  };

  static times = {
    setTime(request: RequestSetTime) {
      return import("@/infrastructure/times/times-rest").then(module =>
        module.default.setTime(request)
      );
    },
    getTimes(request: RequestGetTimes) {
      return import("@/infrastructure/times/times-rest").then(module =>
        module.default.getTimes(request)
      );
    },
    updateTime(request: RequestUpdateTime) {
      return import("@/infrastructure/times/times-rest").then(module =>
        module.default.updateTime(request)
      );
    }
  };
}
