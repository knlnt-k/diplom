export interface IToken {
  access: number;
  exp: number;
  iat: number;
  id: number;
  isCompany: boolean;
  name: string;
  company_id: number;
}

export interface IPagination {
  total: number;
  offset: number;
  limit: number;
}

export const ASC_OBJECTS = [
  { value: 0, text: "По убыванию" },
  { value: 1, text: "По возрастанию" }
];

export interface ITimeObject {
  seconds: number;
  getString(format?: string): string;
}
