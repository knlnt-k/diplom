import { defineComponent, PropType } from "vue";

import List from "@/components/list/list.vue";
import Popup from "@/components/popup/popup.vue";
import Form from "@/components/form/form.vue";
import Button from "@/components/button/button.vue";

import { IProject } from "@/infrastructure/projects/i-internal";
import { IForm } from "@/components/form/i-internal";
import { IPagination } from "@/infrastructure/i-internal";
import { IIsCan } from "@/store/i-internal";

export default defineComponent({
  name: "Projects",
  components: {
    List,
    Popup,
    Form,
    Button
  },
  props: {
    form: Object as PropType<IForm>,
    projects: {
      type: Array as PropType<IProject[]>,
      required: true
    },
    apiState: Object as PropType<{
      isLoadGetProjects: boolean;
      isLoadEditProject: boolean;
    }>,
    isEdit: Boolean,
    pagination: Object as PropType<IPagination>,
    currentProject: Object as PropType<IProject | null>,
    isCanDeleteProject: Boolean
  },
  computed: {
    apiPoint(): string {
      return this.isEdit ? "update-project" : "create-project";
    },
    isCan(): IIsCan {
      return this.$store.getters.isCan
    }
  },
  methods: {
    handleClickProjectItem(project: IProject) {
      this.$popups.toggleVisible("newProject");
      this.$emit("setCurrentProject", project);
    }
  }
});
