import { ITimes } from "@/infrastructure/times/i-internal";
import { getDHMFromString } from "@/infrastructure/services/get-dhm-from-string";
import { timestampToDate } from "@/infrastructure/services/timestamp-to-date";
import { ITask } from "@/infrastructure/tasks/i-internal";
import { StatusesTask } from "@/infrastructure/constants";

export interface IReportItems {
  current: any;
  currentName: "myReportOnTime" | "gantReport" | "";
  list: {
    myReportOnTime: IReportItem;
    gantReport: IReportItem;
  };
}

export interface IReportItem {
  text: string;
  report: (...args: any) => any;
}

window.google.charts.load("current", {
  packages: ["calendar", "gantt"],
  language: "ru"
});

export default {
  currentName: "",
  current: null,
  list: {
    myReportOnTime: {
      text: "Мой отчет по времени",
      report(data: Array<ITimes>) {
        this.text += " - загрузка";
        const loadInterval = setInterval(() => {
          if (this.text.includes("-")) {
            this.text = this.text.replace("-", "\\");
          } else if (this.text.includes("\\")) {
            this.text = this.text.replace("\\", "|");
          } else if (this.text.includes("|")) {
            this.text = this.text.replace("|", "/");
          } else {
            this.text = this.text.replace("/", "-");
          }
        }, 200);
        let chart: any;

        const drawChart = () => {
          const dataTable = new window.google.visualization.DataTable();
          dataTable.addColumn({ type: "date", id: "Date" });
          dataTable.addColumn({ type: "number", id: "Won/Loss" });
          dataTable.addColumn({ type: "string", role: "tooltip" });
          dataTable.addRows(
            data.map(t => {
              return [
                timestampToDate(t.created.seconds),
                getDHMFromString(t.time.getString()).hours,
                `<h2 class="title2" style="padding: 10px; width: 150px">${t.time.getString()}</h2>`
              ];
            })
          );

          chart = new window.google.visualization.Calendar(
            document.getElementById("chart")
          );
          window.google.visualization.events.addListener(chart, "ready", () => {
            clearInterval(loadInterval);
            this.text = "Мой отчет по времени";
          });

          chart.draw(dataTable, {
            tooltip: { isHtml: true },
            calendar: { cellSize: 20 },
            get height() {
              return (
                200 +
                (parseInt((dataTable.cache.length / 365).toString()) + 1) *
                  this.calendar.cellSize *
                  7
              );
            }
          });
        };

        window.google.charts.setOnLoadCallback(drawChart);

        return chart;
      }
    },
    gantReport: {
      text: "Диаграмма Гантта",
      report(tasks: ITask[]) {
        this.text += " - загрузка";
        const loadInterval = setInterval(() => {
          if (this.text.includes("-")) {
            this.text = this.text.replace("-", "\\");
          } else if (this.text.includes("\\")) {
            this.text = this.text.replace("\\", "|");
          } else if (this.text.includes("|")) {
            this.text = this.text.replace("|", "/");
          } else {
            this.text = this.text.replace("/", "-");
          }
        }, 200);

        let chart;
        const drawChart = () => {
          const data = new window.google.visualization.DataTable();
          chart = new window.google.visualization.Gantt(
            document.getElementById("chart")
          );

          data.addColumn("string", "Task ID");
          data.addColumn("string", "Название задачи");
          data.addColumn("date", "Start Date");
          data.addColumn("date", "End Date");
          data.addColumn("number", "Продолжительность задачи");
          data.addColumn("number", "Процент выполнения");
          data.addColumn("string", "Dependencies");

          const rows = tasks.map(task => {
            let percentComplete = 0;

            if (
              task.status.id === StatusesTask.cancel ||
              task.status.id === StatusesTask.finish
            ) {
              percentComplete = 100;
            } else if (
              task.status.id === StatusesTask.correct ||
              task.status.id === StatusesTask.develop
            ) {
              percentComplete = 25;
            } else if (task.status.id === StatusesTask.check) {
              percentComplete = 50;
            }

            return [
              task.id.toString(),
              task.name.toString(),
              timestampToDate(task.created.seconds * 1000),
              task.closed.seconds
                ? timestampToDate(task.closed.seconds * 1000)
                : new Date(),
              null,
              percentComplete,
              null
            ];
          });

          data.addRows(rows);

          window.google.visualization.events.addListener(chart, "ready", () => {
            clearInterval(loadInterval);
            this.text = "Диаграмма Гантта";
          });
          chart.draw(data, {
            gantt: {
              trackHeight: 50
            },
            get height() {
              return this.gantt.trackHeight * tasks.length + 100;
            }
          });
        };

        window.google.setOnLoadCallback(drawChart);

        return chart;
      }
    }
  }
} as IReportItems;
