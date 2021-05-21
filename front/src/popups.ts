import { ITask } from "@/infrastructure/tasks/i-internal";

export default {
  list: {
    newProject: {
      visible: false
    },
    newTask: {
      visible: false,
      payload: {
        task: null as ITask | null
      }
    }
  },
  toggleVisible(name) {
    Object.keys(this.list).forEach(key => {
      if (key !== name) {
        this.list[key].visible = false;
      }
    });
    this.list[name].visible = !this.list[name].visible;
  }
} as IPopups;

interface IPopupListItem {
  visible: boolean;
  payload?: any;
}

export interface IPopups {
  list: {
    [key: string]: IPopupListItem;
    newTask: IPopupListItem;
    newProject: IPopupListItem;
  };
  toggleVisible(name: "newTask" | "newProject"): void;
}
