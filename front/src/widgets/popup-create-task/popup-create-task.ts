import { defineComponent } from "vue";

import Popup from "@/components/popup/popup.vue";
import Form from "@/components/form/form.vue";
import Button from "@/components/button/button.vue";
import Selector from "@/components/selector/selector.vue";

import { ICurrentAccount, IIsCan } from "@/store/i-internal";

import { UserToIUser } from "@/infrastructure/users/adapters/user-to-i-user";
import { projectToInternal } from "@/infrastructure/projects/adapters/projectToInternal";
import { ERROR_MSG, ID_ADMIN_USER } from "@/constants";
import { ITask } from "@/infrastructure/tasks/i-internal";
import setup from "@/widgets/popup-create-task/setup";
import { RequestCreateTask } from "@/infrastructure/tasks/i-external";
import { IProject } from "@/infrastructure/projects/i-internal";
import { TimesToInternal } from "@/infrastructure/times/adapters/times-to-internal";
import { RequestGetTimes } from "@/infrastructure/times/i-external";
import { commentsTasksInternal } from "@/infrastructure/comments-tasks/adapters/comments-tasks-to-internal";
import { ITimeAndComment } from "@/widgets/popup-create-task/i-internal";
import { TaskToInternal } from "@/infrastructure/tasks/adapters/task-to-internal";

export default defineComponent({
  name: "PopupCreateTask",
  components: {
    Popup,
    Form,
    Button,
    Selector
  },
  computed: {
    task(): ITask | null {
      return (
        (this.$popups.list.newTask.payload &&
          this.$popups.list.newTask.payload.task) ||
        null
      );
    },
    currentAccount(): ICurrentAccount {
      return this.$store.state.currentAccount;
    },
    isCan(): IIsCan {
      return this.$store.getters.isCan;
    },
    timesAndComments(): ITimeAndComment[] {
      const times: ITimeAndComment[] = this.times.map(time => ({
        id: time.id,
        userID: time.userID,
        taskID: time.taskID,
        created: time.created,
        comment: "Затрачено " + time.time.getString(),
        time: time.time
      }));
      const comments: ITimeAndComment[] = this.comments.map(comment => ({
        id: comment.id,
        userID: comment.userID,
        taskID: comment.taskID,
        comment: comment.comment,
        created: comment.created
      }));

      return times
        .concat(comments)
        .sort((a, b) =>
          this.windowWidth < 1024
            ? a.created.seconds - b.created.seconds
            : b.created.seconds - a.created.seconds
        );
    }
  },
  setup() {
    return setup();
  },
  data() {
    return {
      isEdit: false
    };
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      this.windowWidth = window.innerWidth;

      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth;
      });

      if (this.$popups.list.newTask.visible) {
        this.apiState.isLoad = true;
        this.initialForm();
        this.getTimes();
        this.getComments();

        this.getUsers().finally(() => {
          this.getProjects().finally(() => {
            if (this.task) {
              this.getTask();
            } else {
              this.apiState.isLoad = false;
            }
          });
        });
      }
    },
    initialForm() {
      this.form.elements.submit.methods.click = this.editTask;
      this.formTime.elements.submit.methods.click = this.setTime;
      this.formComments.elements.submit.methods.click = this.setComment;

      if (this.task) {
        this.form.elements.status.vModel = this.task.status.id;
      }

      if (this.isEdit) {
        this.form.elements.submit.props.text = "Сохранить";
        if (this.task) {
          this.form.elements.name.vModel = this.task.name;
          this.form.elements.description.vModel = this.task.description;
          this.form.elements.userID.vModel = this.task.userID;
          this.form.elements.priority.vModel = this.task.priority.priority;
          this.form.elements.projectID.vModel = this.task.projectID;
        }
      } else {
        this.form.elements.submit.props.text = "Создать";
      }
    },
    editTask() {
      if (this.isCan.editTask) {
        const {
          name,
          description,
          userID,
          priority,
          projectID,
          status
        } = this.form.elements;
        const request: RequestCreateTask = {
          name: name.vModel,
          description: description.vModel,
          user_id: userID.vModel,
          priority: priority.vModel,
          project_id: projectID.vModel,
          company_id: this.currentAccount.companyID,
          status: status.vModel
        };
        const typeHandler = this.isEdit ? "updateTask" : "createTask";
        const successText = this.isEdit ? "обновлена" : "создана";

        if (this.isEdit && this.task) {
          request.id = this.task.id;
        }

        if (this.form.validate != undefined) {
          this.form.validate();

          if (!this.form.isValid) {
            return;
          }
        }

        this.$infra.tasks[typeHandler](request).then(response => {
          if (response.answer && response.answer.id) {
            this.$toaster.alert("Задача успешно " + successText, "success");

            if (
              this.$popups.list.newTask.payload.thenForEditTask !== undefined
            ) {
              this.$popups.list.newTask.payload.thenForEditTask();
            }

            this.handleClose();
          } else if (response.error) {
            this.$toaster.alert(response.error.message || ERROR_MSG);
          }
        });
      } else {
        this.$toaster.alert("Нет доступа");
      }
    },
    getUsers() {
      const { currentAccount } = this;

      return this.$infra.users
        .getUsers({
          ids: [],
          filter: {
            companyIDs: [currentAccount.companyID]
          }
        })
        .then(response => {
          const { answer } = response;

          if (answer) {
            this.form.elements.userID.props.options = (
              answer.users || []
            ).map(user => UserToIUser(user));
          }
        });
    },
    getProjects() {
      const { currentAccount } = this;

      return this.$infra.projects
        .getProjects({
          ids: [],
          filter: {
            company_ids: [currentAccount.companyID]
          }
        })
        .then(response => {
          if (response.answer) {
            this.form.elements.projectID.props.options = (
              response.answer.projects || []
            ).map(project => projectToInternal(project));
          }
        });
    },
    handleClose() {
      this.form.clear();

      if (this.form.validate !== undefined) {
        this.form.validate(true);
      }

      this.times = [];
      this.comments = [];
      this.$popups.list.newTask.payload.task = null;
      this.$popups.list.newTask.payload.thenForEditTask = undefined;
      this.isEdit = false;
      this.$popups.toggleVisible("newTask");
    },
    handleClickEditButton() {
      this.isEdit = true;
      this.initialForm();
    },
    getNameProject(projectID: number) {
      return (
        (
          this.form.elements.projectID.props.options.find(
            (p: IProject) => p.id === projectID
          ) || {}
        ).name || ""
      );
    },
    getNameUser(userID: number) {
      return userID === ID_ADMIN_USER
        ? "Администратор"
        : (
            this.form.elements.userID.props.options.find(
              (u: IProject) => u.id === userID
            ) || {}
          ).name || "";
    },
    getTimeStamp(hours: number, minutes: number) {
      return hours * 3600 + minutes * 60;
    },
    setTime() {
      this.formTime.validate();

      if (!this.formTime.isValid) {
        return;
      }

      if (this.task) {
        const { task, currentAccount, formTime } = this;
        const time = this.getTimeStamp(
          formTime.elements.hours.vModel,
          formTime.elements.minutes.vModel
        );

        this.apiState.isLoad = true;

        this.$infra.times
          .setTime({
            task_id: task.id,
            user_id: currentAccount.isCompany
              ? ID_ADMIN_USER
              : currentAccount.id,
            time
          })
          .then(response => {
            const { answer, error } = response;

            if (answer) {
              this.getTimes().then(() => {
                this.apiState.isLoad = false;
              });
              this.formTime.clear();
            } else {
              this.apiState.isLoad = false;
              this.$toaster.alert((error && error.message) || ERROR_MSG);
            }
          });
      }
    },
    getTimes() {
      const filter: RequestGetTimes["filter"] = {
        task_ids: []
      };

      if (this.task && this.task.id) {
        filter.task_ids = [this.task.id];
      }

      return this.$infra.times
        .getTimes({
          filter
        })
        .then(response => {
          const { answer } = response;

          if (answer) {
            this.times = (answer.times || []).map(t => TimesToInternal(t));
          }
        });
    },
    getComments() {
      return this.$infra.comments
        .get({ filter: { task_ids: this.task ? [this.task.id] : [] } })
        .then(response => {
          if (response.answer) {
            this.comments = (response.answer.comments || []).map(c =>
              commentsTasksInternal(c)
            );
          }
        });
    },
    setComment() {
      if (this.task) {
        this.apiState.isLoad = true;

        this.$infra.comments
          .set({
            user_id: this.currentAccount.isCompany
              ? ID_ADMIN_USER
              : this.currentAccount.id,
            task_id: this.task.id,
            comment: this.formComments.elements.comment.vModel
          })
          .then(response => {
            const { answer, error } = response;

            if (error) {
              this.apiState.isLoad = false;

              this.$toaster.alert(error.message || ERROR_MSG);
            }

            if (answer) {
              this.formComments.clear();

              this.getComments().finally(() => {
                this.apiState.isLoad = false;
              });
            }
          });
      }
    },
    handleClickDeleteComment(timeAndComment: ITimeAndComment) {
      if (
        this.isCan.deleteComment(timeAndComment.userID) &&
        !timeAndComment.time
      ) {
        this.deleteComment(timeAndComment.id);
      }
    },
    deleteComment(id: number) {
      this.apiState.isLoad = true;

      this.$infra.comments.delete({ ids: [id] }).then(response => {
        const { answer, error } = response;

        this.apiState.isLoad = false;

        if (error) {
          this.$toaster.alert(error.message || ERROR_MSG);
        } else {
          this.getComments();
        }
      });
    },
    handleChangeStatusTask() {
      if (this.task) {
        this.apiState.isLoad = true;

        this.$infra.tasks
          .changeStatus({
            id: this.task.id,
            status: this.form.elements.status.vModel
          })
          .then(response => {
            if (response.error) {
              this.$toaster.alert(response.error.message || ERROR_MSG);
              this.apiState.isLoad = false;
            } else {
              this.getTask();
              if (
                this.$popups.list.newTask.payload.thenForEditTask !== undefined
              ) {
                this.$popups.list.newTask.payload.thenForEditTask();
              }
            }
          });
      }
    },
    getTask() {
      if (this.task) {
        this.apiState.isLoad = true;
        this.$infra.tasks
          .getTasks({
            ids: [this.task.id],
            filter: { company_ids: [this.currentAccount.companyID] }
          })
          .then(response => {
            this.apiState.isLoad = false;

            if (response.answer && response.answer.tasks) {
              this.$popups.list.newTask.payload.task = TaskToInternal(
                response.answer.tasks[0]
              );
            }
          });
      }
    },
    isMyComment(timeAndComment: ITimeAndComment): boolean {
      return this.currentAccount.isCompany
        ? timeAndComment.userID === ID_ADMIN_USER
        : timeAndComment.userID === this.currentAccount.id;
    }
  },
  watch: {
    "$popups.list.newTask.visible"() {
      if (this.$popups.list.newTask.visible) {
        this.init();
      }
    }
  }
});
