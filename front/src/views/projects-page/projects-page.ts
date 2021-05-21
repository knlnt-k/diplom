import { defineComponent, reactive, ref } from "vue";

import Projects from "./components/projects/projects.vue";

import { ICurrentAccount, IIsCan } from "@/store/i-internal";
import { IProject } from "@/infrastructure/projects/i-internal";
import { IPagination } from "@/infrastructure/i-internal";

import form from "@/views/projects-page/form";
import { projectToInternal } from "@/infrastructure/projects/adapters/projectToInternal";
import { ERROR_MSG } from "@/constants";

export default defineComponent({
  name: "ProjectsPage",
  components: {
    Projects
  },
  setup() {
    const initForm = reactive(form);
    const currentProject = ref(null as IProject | null);

    return {
      form: initForm,
      currentProject: currentProject
    };
  },
  data() {
    return {
      projects: [] as IProject[],
      pagination: {
        total: 0,
        offset: 0,
        limit: 10
      } as IPagination,
      apiState: {
        isLoadGetProjects: true,
        isLoadEditProject: false
      },
      isEdit: false
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
      this.initialForm();
      this.getProjects();
    },
    getProjects() {
      this.apiState.isLoadGetProjects = true;
      this.$infra.projects
        .getProjects({
          ids: [],
          filter: { company_ids: [this.currentAccount.companyID] },
          pagination: {
            offset: this.pagination.offset,
            limit: this.pagination.limit
          }
        })
        .then(response => {
          const { error, answer } = response;

          if (answer) {
            this.projects = (answer.projects || []).map(project =>
              projectToInternal(project)
            );

            this.pagination.total = answer.total;
          } else if (error) {
            this.$toaster.alert(error.message || ERROR_MSG);
          }

          this.apiState.isLoadGetProjects = false;
        });
    },
    initialForm() {
      const that = this;

      Object.defineProperty(this.form.elements.submit.methods, "click", {
        get() {
          return that.isEdit ? that.updateProject : that.createProject;
        }
      });

      Object.defineProperty(this.form.elements.submit.props, "text", {
        get() {
          return that.isEdit ? "Сохранить" : "Создать";
        }
      });

      Object.defineProperty(this.form, "disabled", {
        get() {
          return that.apiState.isLoadEditProject;
        }
      });
    },
    createProject() {
      if (this.isCan.editProject) {
        const { form, currentAccount } = this;
        const { name, description } = form.elements;

        if (form.validate != undefined) {
          form.validate();

          if (!form.isValid) {
            return;
          }
        }

        this.apiState.isLoadEditProject = true;

        this.$infra.projects
          .createProject({
            name: name.vModel,
            description: description.vModel,
            company_id: currentAccount.companyID
          })
          .then(response => {
            const { answer, error } = response;

            if (answer) {
              this.getProjects();
              this.handleClosePopup();
            } else if (error) {
              this.$toaster.alert(error.message || ERROR_MSG);
            }

            this.apiState.isLoadEditProject = false;
          });
      } else {
        this.$toaster.alert("Нет доступа");
      }
    },
    deleteProject(id: number) {
      if (this.isCan.deleteProject) {
        this.$loader.toggle();
        this.$infra.projects.deleteProjects({ ids: [id] }).then(response => {
          const { answer, error } = response;

          if (answer) {
            this.$toaster.alert("Проект успешно удален", "success");
            if (this.projects.length === 1) {
              this.pagination.offset = 0;
            }
            this.getProjects();
          } else if (error) {
            this.$toaster.alert(error.message || ERROR_MSG);
          }

          this.$loader.toggle();
        });
      } else {
        this.$toaster.alert("Нет доступа");
      }
    },
    updateProject() {
      if (this.isCan.editProject) {
        const { form, currentAccount, currentProject } = this;
        const { name, description } = form.elements;

        if (form.validate != undefined) {
          form.validate();

          if (!form.isValid) {
            return;
          }
        }

        this.apiState.isLoadEditProject = true;

        this.$infra.projects
          .updateProject({
            name: name.vModel,
            description: description.vModel,
            company_id: currentAccount.companyID,
            id: (currentProject && currentProject.id) || 0
          })
          .then(response => {
            const { answer, error } = response;

            if (answer) {
              this.getProjects();
              this.handleClosePopup();
              this.$toaster.alert(
                "Информация о проекте успешно изменена",
                "success"
              );
            } else if (error) {
              this.$toaster.alert(error.message || ERROR_MSG);
            }

            this.apiState.isLoadEditProject = false;
          });
      } else {
        this.$toaster.alert("Нет доступа");
      }
    },
    handleClosePopup() {
      this.form.clear();
      if (this.isEdit) {
        this.toggleIsEdit(false);
        this.setCurrentProject(null);
      }
      this.$popups.list.newProject.visible = false;
    },
    changePage(page: number) {
      this.pagination.offset = this.pagination.limit * page;
      this.getProjects();
    },
    setCurrentProject(project: IProject | null) {
      this.currentProject = project;

      if (project) {
        this.form.elements.name.vModel = project.name;
        this.form.elements.description.vModel = project.description;
      } else {
        this.form.clear();
      }
    },
    toggleIsEdit(isEdit: boolean) {
      this.isEdit = isEdit;
    }
  }
});
