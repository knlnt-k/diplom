import { ITimeObject } from "@/infrastructure/i-internal";

export interface IComment {
  id: number;
  taskID: number;
  userID: number;
  comment: string;
  created: ITimeObject;
}
