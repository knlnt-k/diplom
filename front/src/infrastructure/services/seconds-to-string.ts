export const secondsToString: (seconds: number) => string = seconds => {
  const countSecondsInDay = 28800;
  const countSecondsInHour = 3600;
  const countSecondsInMinutes = 60;
  const d = parseInt(String(seconds / countSecondsInDay));
  let answer = "";

  if (d > 0) {
    seconds -= d * countSecondsInDay;
    answer += d + "д ";
  }

  const h = parseInt(String(seconds / countSecondsInHour));

  if (h > 0) {
    seconds -= h * countSecondsInHour;
    answer += h + "ч ";
  }

  const m = parseInt(String(seconds / countSecondsInMinutes));

  if (m > 0) {
    seconds -= m * countSecondsInMinutes;
    answer += m + "м";
  }

  return answer;

  // if (seconds >= hourInSeconds) {
  //   if (seconds === hourInSeconds) {
  //     return "1 ч";
  //   } else if (seconds >= hourInSeconds * 8) {
  //     if (seconds === hourInSeconds * 8) {
  //       return "1 д";
  //     } else {
  //       return parseInt(String(seconds / countSecondsInDay)) + "д" +  ;
  //     }
  //   } else {
  //     return (
  //       parseInt(String(seconds / hourInSeconds)) +
  //       " ч " +
  //       (seconds % hourInSeconds) +
  //       " м"
  //     );
  //   }
  // }
};
