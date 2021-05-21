import { StatusesTask } from "@/infrastructure/constants";

export const getStatusObject: (status: number) => IStatusObject = status => {
  const statusObject: IStatusObject = { text: "Можно делать", id: status };

  if (status === StatusesTask.develop) statusObject.text = "В работе";
  if (status === StatusesTask.reopen) statusObject.text = "Переоткрыта";
  if (status === StatusesTask.cancel) statusObject.text = "Отменена";
  if (status === StatusesTask.correct) statusObject.text = "На уточнение";
  if (status === StatusesTask.finish) statusObject.text = "Завершена";

  return statusObject;
};

export interface IStatusObject {
  id: number;
  text: string;
}
