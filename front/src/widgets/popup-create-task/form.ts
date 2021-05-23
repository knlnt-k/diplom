import { IUser } from "@/infrastructure/users/i-internal";
import { Priorities, StatusesTask } from "@/infrastructure/constants";
import { getPriorityObject } from "@/infrastructure/services/get-priority-object";
import { IProject } from "@/infrastructure/projects/i-internal";
import { getStatusObject } from "@/infrastructure/services/get-status-object";
import { getObjectFromEnum } from "@/infrastructure/services/get-object-from-enum";
import CreateForm from "@/components/form/create-form";

export default CreateForm({
  name: "newTask",
  disabled: false,
  elements: {
    name: {
      nameComponent: "Input",
      initValue: "",
      vModel: "",
      props: {
        label: "Название",
        required: true
      },
      methods: {},
      get valid() {
        return {
          isValid: !!this.vModel
        };
      }
    },
    description: {
      nameComponent: "Textarea",
      initValue: "",
      vModel: "",
      props: {
        label: "Описание"
      },
      methods: {}
    },
    userID: {
      nameComponent: "Selector",
      initValue: 0,
      vModel: 0,
      props: {
        options: [] as IUser[],
        textField: "fullName",
        valueField: "id",
        isNotClear: true,
        className: "selector-for-forms",
        label: "Исполнитель"
      },
      methods: {}
    },
    priority: {
      nameComponent: "Selector",
      initValue: Priorities.normal,
      vModel: Priorities.normal,
      props: {
        options: getObjectFromEnum(Priorities, getPriorityObject),
        className: "selector-for-forms",
        textField: "text",
        isNotClear: true,
        valueField: "priority",
        label: "Приоритет"
      },
      methods: {},
      slots: [
        {
          name: "default",
          slot(payload) {
            const option = `<span class="selector-for-forms__priority-slot" style="border-left: 4px solid ${payload.option.color}; padding-left: 5px;">${payload.option.text}</span>`;

            return option;
          }
        }
      ]
    },
    projectID: {
      nameComponent: "Selector",
      initValue: 0,
      vModel: 0,
      props: {
        options: [] as IProject[],
        textField: "name",
        valueField: "id",
        label: "Проект",
        isNotClear: true,
        className: "selector-for-forms",
        isRequired: true
      },
      methods: {},
      get valid() {
        const isValid = !Number.isNaN(this.vModel) && this.vModel > 0;

        return {
          isValid
        };
      }
    },
    status: {
      nameComponent: "Selector",
      initValue: StatusesTask.canDo,
      vModel: StatusesTask.canDo,
      props: {
        options: getObjectFromEnum(StatusesTask, getStatusObject),
        textField: "text",
        valueField: "id",
        isNotClear: true,
        className: "selector-for-forms",
        label: "Статус"
      },
      methods: {}
    },
    submit: {
      nameComponent: "Button",
      initValue: "",
      vModel: "",
      props: {
        text: "Создать"
      },
      methods: {
        click: () => {
          //
        }
      },
      style: {
        marginLeft: "auto"
      }
    }
  },
  schema: [
    ["name"],
    ["projectID"],
    ["priority", "status"],
    ["userID"],
    ["description"],
    ["submit"]
  ],
  isValid: true
});
