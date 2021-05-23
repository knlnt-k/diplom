import { ITimeObject } from "@/infrastructure/i-internal";

export interface ITimeAndComment {
  id: number;
  taskID: number;
  userID: number;
  time?: ITimeObject;
  comment?: string;
  created: ITimeObject;
}
