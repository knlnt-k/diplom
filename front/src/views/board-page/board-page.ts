import { defineComponent, ref } from "vue";

import Board from "./components/board/board.vue";
import { ICurrentAccount, IIsCan } from "@/store/i-internal";
import { IProject } from "@/infrastructure/projects/i-internal";
import { projectToInternal } from "@/infrastructure/projects/adapters/projectToInternal";
import { IFilterTasks } from "@/views/board-page/i-internal";
import { ERROR_MSG } from "@/constants";
import { TaskToInternal } from "@/infrastructure/tasks/adapters/task-to-internal";
import { ITask } from "@/infrastructure/tasks/i-internal";
import { RequestGetTasks } from "@/infrastructure/tasks/i-external";

export default defineComponent({
  name: "BoardPage",
  components: {
    Board
  },
  setup() {
    return {
      projects: ref([] as IProject[]),
      tasks: ref([] as ITask[])
    };
  },
  data() {
    return {
      filterTask: {
        projectId: 0
      } as IFilterTasks
    };
  },
  beforeMount() {
    this.init();
  },
  computed: {
    currentAccount(): ICurrentAccount {
      return this.$store.state.currentAccount;
    }
  },
  methods: {
    init() {
      this.$loader.toggle();

      this.getProjects();
    },
    getProjects() {
      this.$infra.projects
        .getProjects({
          ids: [],
          filter: { company_ids: [this.currentAccount.companyID] }
        })
        .then(response => {
          if (this.$loader.isLoad) this.$loader.toggle(false);

          this.projects = (response.answer?.projects || []).map(project =>
            projectToInternal(project)
          );
        });
    },
    getTasks() {
      if (!this.$loader.isLoad) {
        const filter: RequestGetTasks["filter"] = {
          company_ids: [this.currentAccount.companyID]
        };

        this.$loader.toggle();

        if (!this.currentAccount.isCompany) {
          filter.user_ids = [this.currentAccount.id];
        }

        if (this.filterTask.projectId) {
          filter.project_ids = [this.filterTask.projectId];
        }

        return this.$infra.tasks
          .getTasks({ ids: [], filter })
          .then(response => {
            const { answer, error } = response;

            this.$loader.toggle(false);

            if (error) {
              this.$toaster.alert(error.message || ERROR_MSG);
            }

            if (answer && answer.tasks) {
              this.tasks = answer.tasks.map(task => TaskToInternal(task));
            } else {
              this.tasks = [];
            }
          });
      }

      return new Promise(resolve => resolve(true));
    },
    deleteTask(id: number) {
      this.$infra.tasks.deleteTasks({ ids: [id] }).then(response => {
        const { answer, error } = response;

        if (error) {
          this.$toaster.alert(error.message || ERROR_MSG);
        }

        if (answer) {
          this.getTasks();
          this.$toaster.alert("Задача успешно удалена", "success");
        }
      });
    }
  },
  watch: {
    projects: {
      handler() {
        if (this.projects.length && !this.filterTask.projectId) {
          this.filterTask.projectId = this.projects[0].id;
        } else {
          this.filterTask.projectId = 0;
        }
      },
      deep: true
    },
    "filterTask.projectId": {
      handler() {
        this.getTasks();
      }
    },
    "$popups.list.newTask.visible": {
      handler(visible: boolean) {
        if (visible) {
          this.$popups.list.newTask.payload.thenForEditTask = this.getTasks;
        }
      }
    }
  }
});
