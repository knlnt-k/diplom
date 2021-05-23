export const getDHMFromString: (
  str: string
) => { days: number; hours: number; minutes: number } = str => {
  const getNum = (k: string) => {
    const n = str.includes(k) ? Number(str.split(k)[0]) : 0;

    if (str.includes(n + k)) str = str.replace(n + k, "");

    return n;
  };

  return {
    days: getNum("д"),
    hours: getNum("ч"),
    minutes: getNum("м")
  };
};
