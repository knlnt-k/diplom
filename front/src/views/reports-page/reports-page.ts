import { defineComponent, ref } from "vue";

import Reports from "@/views/reports-page/components/reports.vue";
import { ERROR_MSG, ID_ADMIN_USER } from "@/constants";
import { ITimes } from "@/infrastructure/times/i-internal";
import { TimesToInternal } from "@/infrastructure/times/adapters/times-to-internal";
import { ICurrentAccount } from "@/store/i-internal";
import { TaskToInternal } from "@/infrastructure/tasks/adapters/task-to-internal";
import { ITask } from "@/infrastructure/tasks/i-internal";
import { IReportItems } from "@/views/reports-page/components/reports-list";
import { RequestGetTasks } from "@/infrastructure/tasks/i-external";
import { RequestGetTimes } from "@/infrastructure/times/i-external";
import { IProject } from "@/infrastructure/projects/i-internal";
import { projectToInternal } from "@/infrastructure/projects/adapters/projectToInternal";

export default defineComponent({
  name: "ReportsPage",
  components: {
    Reports
  },
  setup() {
    return {
      times: ref([] as ITimes[]),
      tasks: ref([] as ITask[]),
      projects: ref([] as IProject[]),
      projectID: ref(0)
    };
  },
  computed: {
    currentAccount(): ICurrentAccount {
      return this.$store.state.currentAccount;
    }
  },
  methods: {
    getTimes(request: RequestGetTimes) {
      return this.$infra.times.getTimes(request).then(response => {
        const { answer, error } = response;

        if (error) {
          this.$toaster.alert(error.message || ERROR_MSG);
        }

        if (answer && answer.times) {
          this.times = answer.times.map(t => TimesToInternal(t));
        }
      });
    },
    getTasks(request: RequestGetTasks) {
      return this.$infra.tasks.getTasks(request).then(response => {
        const { answer, error } = response;

        if (error) {
          this.$toaster.alert(error.message || ERROR_MSG);
        }

        if (answer && answer.tasks) {
          this.tasks = answer.tasks.map(t => TaskToInternal(t));
        }
      });
    },
    getProjects() {
      this.$loader.toggle();

      this.$infra.projects
        .getProjects({
          ids: [],
          filter: {
            company_ids: [this.currentAccount.companyID]
          }
        })
        .then(response => {
          const { answer, error } = response;

          this.$loader.toggle();

          if (error) {
            this.$toaster.alert(error.message || ERROR_MSG);
          }

          if (answer && answer.projects) {
            this.projects = answer.projects.map(p => projectToInternal(p));
          }
        });
    },
    createReport({
      name,
      callback
    }: {
      name: IReportItems["currentName"];
      callback?: Function;
    }) {
      if (name === "myReportOnTime") {
        this.$loader.toggle();
        this.getTimes({
          filter: {
            user_ids: [
              this.currentAccount.isCompany
                ? ID_ADMIN_USER
                : this.currentAccount.id
            ]
          }
        }).finally(() => {
          if (callback) {
            callback();
          }
          this.$loader.toggle();
        });
      }

      if (name === "gantReport") {
        this.$loader.toggle();

        this.getTasks({
          ids: [],
          filter: {
            company_ids: [this.currentAccount.companyID]
          }
        }).finally(() => {
          if (this.tasks.length) {
            this.getTimes({
              filter: {
                task_ids: this.tasks.map(t => t.id)
              }
            }).finally(() => {
              if (callback) {
                callback();
              }
              this.$loader.toggle();
            });
          } else {
            this.$loader.toggle();
          }
        });
      }
    },
    changeProjectID(id: number) {
      this.projectID = id;
    }
  }
});
