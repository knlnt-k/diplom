import { Priorities, StatusesTask } from "@/infrastructure/constants";
import { getObjectFromEnum } from "@/infrastructure/services/get-object-from-enum";
import { getPriorityObject } from "@/infrastructure/services/get-priority-object";
import { h } from "vue";
import { IUser } from "@/infrastructure/users/i-internal";
import { IProject } from "@/infrastructure/projects/i-internal";
import { taskSortFields } from "@/infrastructure/tasks/i-internal";
import { getStatusObject } from "@/infrastructure/services/get-status-object";
import { ASC_OBJECTS } from "@/infrastructure/i-internal";
import CreateForm from "@/components/form/create-form";

export default CreateForm({
  name: "filterFormTasks",
  elements: {
    text: {
      nameComponent: "Input",
      initValue: "",
      vModel: "",
      props: {
        label: "Поиск"
      },
      methods: {}
    },
    priorities: {
      nameComponent: "Selector",
      initValue: [],
      vModel: [],
      props: {
        options: getObjectFromEnum(Priorities, getPriorityObject),
        className: "selector-for-forms",
        textField: "text",
        valueField: "priority",
        multiple: true,
        isNotClear: true,
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
    isOpenExtendsFilter: {
      nameComponent: "custom",
      component(props: any) {
        return h(`button`, { class: "button-link" }, [
          props.isOpen ? "Свернуть" : "Развернуть фильтры"
        ]);
      },
      initValue: false,
      vModel: false,
      props: {
        isOpen: false
      },
      methods: {}
    },
    userIDs: {
      nameComponent: "Selector",
      initValue: [],
      vModel: [],
      vIf: true,
      props: {
        className: "selector-for-forms",
        options: [] as IUser[],
        textField: "fullName",
        valueField: "id",
        multiple: true,
        isNotClear: true,
        label: "Пользователь"
      },
      methods: {}
    },
    projectIDs: {
      nameComponent: "Selector",
      initValue: [],
      vModel: [],
      vIf: true,
      props: {
        className: "selector-for-forms",
        options: [] as IProject[],
        textField: "name",
        valueField: "id",
        multiple: true,
        isNotClear: true,
        label: "Проект"
      },
      methods: {}
    },
    statuses: {
      nameComponent: "Selector",
      initValue: [],
      vModel: [],
      vIf: true,
      props: {
        className: "selector-for-forms",
        options: getObjectFromEnum(StatusesTask, getStatusObject),
        textField: "text",
        valueField: "id",
        multiple: true,
        isNotClear: true,
        label: "Статус"
      },
      methods: {}
    },
    sortFields: {
      nameComponent: "Selector",
      initValue: taskSortFields[0].field,
      vModel: taskSortFields[0].field,
      vIf: true,
      props: {
        className: "selector-for-forms",
        options: taskSortFields,
        textField: "text",
        valueField: "field",
        isNotClear: true,
        label: "Сортировать по"
      },
      methods: {}
    },
    asc: {
      nameComponent: "Selector",
      initValue: ASC_OBJECTS[0].value,
      vModel: ASC_OBJECTS[0].value,
      vIf: true,
      props: {
        className: "selector-for-forms",
        options: ASC_OBJECTS,
        textField: "text",
        valueField: "value",
        isNotClear: true,
        label: "Упорядоченность"
      },
      methods: {}
    },
    search: {
      nameComponent: "Button",
      initValue: "",
      vModel: "",
      props: {
        text: "Искать"
      },
      methods: {}
    }
  },
  schema: [
    ["text", "priorities"],
    ["isOpenExtendsFilter"],
    ["userIDs", "projectIDs", "statuses"],
    ["sortFields", "asc"],
    ["search"]
  ]
});
