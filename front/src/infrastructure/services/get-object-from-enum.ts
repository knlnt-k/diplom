export const getObjectFromEnum = (
  enumData: any,
  converter: (a: any) => any
) => {
  return Object.keys(enumData)
    .filter(e => !Number.isNaN(Number(e)))
    .map(e => converter(Number(e)));
};
