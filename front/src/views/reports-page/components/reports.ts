import { defineComponent, PropType, reactive, ref } from "vue";

import Selector from "@/components/selector/selector.vue";

import reportsList, { IReportItem, IReportItems } from "./reports-list";

import { ITimes } from "@/infrastructure/times/i-internal";
import { ICurrentAccount } from "@/store/i-internal";
import { ITask } from "@/infrastructure/tasks/i-internal";
import { IProject } from "@/infrastructure/projects/i-internal";

export default defineComponent({
  name: "Reports",
  components: {
    Selector
  },
  props: {
    times: {
      type: Array as PropType<ITimes[]>,
      required: false
    },
    tasks: {
      type: Array as PropType<ITask[]>,
      required: false
    },
    projects: {
      type: Array as PropType<IProject[]>,
      required: false
    }
  },
  setup() {
    return {
      reports: reactive(reportsList),
      projectID: ref(0)
    };
  },
  computed: {
    currentAccount(): ICurrentAccount {
      return this.$store.state.currentAccount;
    }
  },
  methods: {
    handleClickReportItem(
      report: IReportItem,
      key: IReportItems["currentName"]
    ) {
      this.reports.currentName = key;

      if (key === "gantReport" && this.projectID === 0) {
        this.$emit("getProjects");

        return;
      }

      this.$emit("createReport", {
        name: key,
        callback: () => {
          if (key === "myReportOnTime") {
            this.setCurrentReport(key, this.times);
          }

          if (key === "gantReport") {
            this.setCurrentReport(key, this.tasks, this.times);
          }
        }
      });
    },
    setCurrentReport(name: IReportItems["currentName"], ...args: any) {
      if (name) {
        this.reports.current = this.reports.list[name].report(...args);
      }
    }
  },
  watch: {
    projectID() {
      this.$emit("changeProjectID", this.projectID);
      this.handleClickReportItem(this.reports.list.gantReport, "gantReport");
    }
  }
});
