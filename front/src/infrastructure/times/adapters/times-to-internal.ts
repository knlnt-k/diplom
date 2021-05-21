import { Times } from "@/infrastructure/times/i-external";
import { ITimes } from "@/infrastructure/times/i-internal";
import {
  dateToString,
  timestampToDate
} from "@/infrastructure/services/timestamp-to-date";
import { secondsToString } from "@/infrastructure/services/seconds-to-string";

export const TimesToInternal: (times: Times) => ITimes = times => ({
  id: times.id || 0,
  userID: times.user_id,
  taskID: times.task_id,
  time: {
    seconds: times.time,
    getString(format = ""): string {
      return secondsToString(this.seconds);
    }
  },
  created: {
    seconds: (times.created || 0) * 1000,
    getString(format: string): string {
      return dateToString(format, timestampToDate(this.seconds));
    }
  }
});
