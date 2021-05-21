import { Profession } from "@/infrastructure/i-internal";

export const getProfessionObject: (
  profession: number
) => IProfessionObject = profession => {
  const professionObject: IProfessionObject = { text: "", id: profession };

  if (profession === Profession.pm) professionObject.text = "Проект-менеджер";
  if (profession === Profession.fronted) professionObject.text = "Фронтенд";
  if (profession === Profession.backend) professionObject.text = "Бэкенд";
  if (profession === Profession.design) professionObject.text = "Дизайнер";
  if (profession === Profession.tests) professionObject.text = "Тестировщик";

  return professionObject;
};

export interface IProfessionObject {
  text: string;
  id: number;
}
