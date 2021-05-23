import { IAccessObject } from "@/infrastructure/services/get-access-object";
import { IProfessionObject } from "@/infrastructure/services/get-profession-object";

export interface IUser {
  id: number;
  name: string;
  lastName: string;
  fullName: string;
  login: string;
  companyID: number;
  profession: IProfessionObject;
  access: IAccessObject;
}
