import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Tooltip
} from "chart.js";
import "chartjs-adapter-date-fns";
import { ITimes } from "@/infrastructure/times/i-internal";
import { getDHMFromString } from "@/infrastructure/services/get-dhm-from-string";
import { ITimeObject } from "@/infrastructure/i-internal";

Chart.register(
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Tooltip
);

export interface IReportItems {
  current: Chart | null;
  currentName: "myReportOnTime" | "empty" | "";
  list: {
    empty: IReportItem;
    myReportOnTime: IReportItem;
  };
}

export interface IReportItem {
  text: string;
  report: (...args: any) => Chart;
}

export default {
  currentName: "",
  current: null,
  list: {
    empty: {
      text: "empty",
      report() {
        return new Chart("chart", {
          type: "bar",
          data: {
            labels: ["1"],
            datasets: [
              {
                label: "1",
                data: [1]
              }
            ]
          }
        });
      }
    },
    myReportOnTime: {
      text: "Мой отчет по времени",
      report(data: Array<ITimes>) {
        const days = data
          .sort((a, b) => a.created.seconds - b.created.seconds)
          .reduce((acc: { label: string; time: ITimeObject }[], t) => {
            const exist = acc.findIndex(
              a => t.created.getString("dd MMMM YYYY") === a.label
            );

            if (exist === -1) {
              acc.push({
                label: t.created.getString("dd MMMM YYYY"),
                time: t.time
              });
            } else {
              acc[exist].time.seconds += t.time.seconds;
            }

            return acc;
          }, []);

        return new Chart("chart", {
          type: "bar",
          data: {
            labels: days.map(d => d.label),
            datasets: [
              {
                data: days.map(d => {
                  const { days, hours, minutes } = getDHMFromString(
                    d.time.getString()
                  );

                  return (
                    Math.round((days * 8 + hours + minutes / 60) * 100) / 100
                  );
                })
              }
            ]
          },
          options: {
            plugins: {
              tooltip: {
                callbacks: {
                  label({ raw }) {
                    return raw + "ч";
                  }
                }
              }
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "часы"
                }
              }
            }
          }
        });
      }
    }
  }
} as IReportItems;
