import { defineComponent, PropType, ref } from "vue";

import Selector from "@/components/selector/selector.vue";
import Button from "@/components/button/button.vue";

import { IProject } from "@/infrastructure/projects/i-internal";
import { IFilterTasks } from "@/views/board-page/i-internal";
import { Priorities, StatusesTask } from "@/infrastructure/constants";
import { getObjectFromEnum } from "@/infrastructure/services/get-object-from-enum";
import {
  getPriorityObject,
  IPriorityObject
} from "@/infrastructure/services/get-priority-object";
import {
  getStatusObject,
  IStatusObject
} from "@/infrastructure/services/get-status-object";
import { ITask } from "@/infrastructure/tasks/i-internal";
import { IIsCan } from "@/store/i-internal";

export default defineComponent({
  name: "Board",
  components: {
    Selector,
    Button
  },
  props: {
    projects: {
      type: Array as PropType<IProject[]>,
      required: true
    },
    filterTask: {
      type: Object as PropType<IFilterTasks>,
      required: true
    },
    tasks: {
      type: Array as PropType<ITask[]>,
      required: true
    }
  },
  setup(props) {
    const board = ref(
      getObjectFromEnum(Priorities, getPriorityObject)
        .sort(
          (a: IPriorityObject, b: IPriorityObject) => b.priority - a.priority
        )
        .map((priority: IPriorityObject) => {
          return {
            priority,
            isShow: false,
            statuses: getObjectFromEnum(StatusesTask, getStatusObject).map(
              (status: IStatusObject) => {
                return {
                  status,
                  isShow: false,
                  get tasks() {
                    return props.tasks.filter(
                      task =>
                        task.priority.priority === priority.priority &&
                        task.status.id === status.id
                    );
                  }
                };
              }
            )
          };
        }) as Array<{
        priority: IPriorityObject;
        isShow: boolean;
        statuses: Array<{
          status: IStatusObject;
          isShow: boolean;
          tasks: ITask[];
        }>;
      }>
    );

    return {
      board
    };
  },
  computed: {
    isCan(): IIsCan {
      return this.$store.getters.isCan;
    }
  },
  data: () => {
    return {};
  },
  methods: {
    handleToggleShowCells(
      row: { isShow: boolean },
      index: number,
      rows: { isShow: boolean }[]
    ) {
      rows.forEach((r, i) => {
        if (i !== index) r.isShow = false;
      });

      row.isShow = !row.isShow;
    },
    handleClickTask(task: ITask) {
      this.$popups.list.newTask.payload.task = task;
      this.$popups.toggleVisible("newTask");
    }
  }
});
