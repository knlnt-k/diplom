import { ITimeObject } from "@/infrastructure/i-internal";

export interface ITimes {
  id: number;
  taskID: number;
  userID: number;
  time: ITimeObject;
  created: ITimeObject;
}
