import { Accesses } from "@/infrastructure/constants";

export const getAccessObject: (access: number) => IAccessObject = access => {
  const accessObject: IAccessObject = { text: "Базовый", id: access };

  if (access === Accesses.admin) accessObject.text = "Администратор";
  if (access === Accesses.task_editor) accessObject.text = "Проект-менеджер";

  return accessObject;
};

export interface IAccessObject {
  id: number;
  text: string;
}
