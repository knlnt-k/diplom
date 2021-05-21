const datef = require("datef");

datef.lang("ru");

export const timestampToDate: (timestamp: number) => Date = timestamp => {
  return new Date(timestamp);
};

export const dateToString: (format: string, date: Date) => string = (
  format,
  date
) => {
  return datef(format, date);
};
