import { defineComponent } from "vue";

import Tasks from "./components/tasks/tasks.vue";

import { UserToIUser } from "@/infrastructure/users/adapters/user-to-i-user";
import { TaskToInternal } from "@/infrastructure/tasks/adapters/task-to-internal";
import throttle from "@/infrastructure/services/throttle";

import setup from "@/views/tasks-page/setup";

import { ICurrentAccount, IIsCan } from "@/store/i-internal";
import { projectToInternal } from "@/infrastructure/projects/adapters/projectToInternal";
import { ITask } from "@/infrastructure/tasks/i-internal";
import { IPagination } from "@/infrastructure/i-internal";

import { ERROR_MSG } from "@/constants";

export default defineComponent({
  name: "TasksPage",
  components: {
    Tasks
  },
  setup() {
    return setup();
  },
  data() {
    return {
      tasks: [] as ITask[],
      pagination: { total: 0, limit: 10, offset: 0 } as IPagination,
      apiState: {
        isLoadTasks: true
      },
      throttleGetTasks: throttle(this.getTasks, 2000)
    };
  },
  computed: {
    currentAccount(): ICurrentAccount {
      return this.$store.state.currentAccount;
    },
    isCan(): IIsCan {
      return this.$store.getters.isCan;
    }
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      this.initFormFilter();
      this.getTasks();
      this.getProjects();
      this.getUsers();
      this.$popups.list.newTask.payload.thenForEditTask = this.getTasks;
    },
    initFormFilter() {
      this.formFilter.elements.isOpenExtendsFilter.methods.click = () => {
        this.formFilter.elements.isOpenExtendsFilter.vModel = !this.formFilter
          .elements.isOpenExtendsFilter.vModel;

        if (this.formFilter.elements.isOpenExtendsFilter.vModel) {
          this.getUsers();
          this.getProjects();
        }
      };

      this.formFilter.elements.search.methods.click = this.getTasks;

      if (!this.currentAccount.isCompany && this.currentAccount.isAuth) {
        this.formFilter.elements.userIDs.vModel = [this.currentAccount.id];
      }
    },
    getTasks() {
      const { pagination, formFilter } = this;
      const {
        text,
        priorities,
        userIDs,
        projectIDs,
        statuses,
        sortFields,
        asc
      } = formFilter.elements;

      this.apiState.isLoadTasks = true;

      return this.$infra.tasks
        .getTasks({
          ids: [],
          filter: {
            text: text.vModel,
            priorities: priorities.vModel,
            user_ids: userIDs.vModel,
            project_ids: projectIDs.vModel,
            company_ids: [this.currentAccount.companyID],
            statuses: statuses.vModel
          },
          sort: {
            field: sortFields.vModel,
            asc: Boolean(asc.vModel)
          },
          pagination: {
            limit: pagination.limit,
            offset: pagination.offset
          }
        })
        .then(response => {
          const { answer, error } = response;

          if (answer) {
            this.tasks = (answer.tasks || []).map(t => TaskToInternal(t));
            this.pagination.total = answer.total;
          }

          if (error) {
            this.$toaster.alert(error.message || ERROR_MSG);
          }

          this.apiState.isLoadTasks = false;
        });
    },
    getUsers() {
      this.$infra.users
        .getUsers({
          ids: [],
          filter: {
            companyIDs: [this.currentAccount.companyID]
          }
        })
        .then(response => {
          const { answer } = response;

          this.formFilter.elements.userIDs.props.options = answer
            ? answer.users.map(u => UserToIUser(u))
            : [];
        });
    },
    getProjects() {
      this.$infra.projects
        .getProjects({
          ids: [],
          filter: {
            company_ids: [this.currentAccount.companyID]
          }
        })
        .then(response => {
          const { answer } = response;

          this.formFilter.elements.projectIDs.props.options = answer
            ? answer.projects.map(p => projectToInternal(p))
            : [];
        });
    },
    deleteTasks(id: number) {
      if(this.isCan.deleteTask) {
        this.$loader.toggle();

        this.$infra.tasks.deleteTasks({ ids: [id] }).then(response => {
          const { answer, error } = response;

          if (answer) {
            this.$toaster.alert("Задача успешно удалена", "success");
          } else {
            this.$toaster.alert((error && error.message) || ERROR_MSG);
          }

          this.$loader.toggle();

          this.getTasks();
        });
      }
      else {
        this.$toaster.alert("Нет доступа")
      }
    }
  },
  watch: {
    "formFilter.elements.text.vModel"() {
      this.throttleGetTasks();
    }
  }
});
