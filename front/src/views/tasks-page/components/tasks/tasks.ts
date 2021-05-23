import { defineComponent, PropType } from "vue";

import List from "@/components/list/list.vue";
import Form from "@/components/form/form.vue";
import Button from "@/components/button/button.vue";
import Popup from "@/components/popup/popup.vue";

import { IForm } from "@/components/form/i-internal";
import { ITask } from "@/infrastructure/tasks/i-internal";
import { IPagination } from "@/infrastructure/i-internal";
import { IProject } from "@/infrastructure/projects/i-internal";
import { IIsCan } from "@/store/i-internal";

export default defineComponent({
  name: "Tasks",
  components: {
    List,
    Form,
    Button,
    Popup
  },
  props: {
    formFilter: {
      type: Object as PropType<IForm>,
      required: true
    },
    tasks: {
      type: Array as PropType<ITask[]>,
      required: true
    },
    pagination: {
      type: Object as PropType<IPagination>,
      required: true
    },
    apiState: {
      type: Object as PropType<{
        isLoadTasks: boolean;
      }>
    }
  },
  computed: {
    isCan(): IIsCan {
      return this.$store.getters.isCan;
    }
  },
  methods: {
    getNameProject(projectID: number) {
      return (
        (
          this.formFilter.elements.projectIDs.props.options.find(
            (p: IProject) => p.id === projectID
          ) || {}
        ).name || ""
      );
    },
    getNameUser(userID: number) {
      return (
        (
          this.formFilter.elements.userIDs.props.options.find(
            (u: IProject) => u.id === userID
          ) || {}
        ).name || ""
      );
    },
    handleClickTaskItem(task: ITask) {
      this.$emit("openPopup", task);
    }
  }
});
