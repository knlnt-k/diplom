import { defineComponent, PropType, reactive, ref } from "vue";

import reportsList, { IReportItem, IReportItems } from "./reports-list";
import { ITimes } from "@/infrastructure/times/i-internal";
import { ICurrentAccount } from "@/store/i-internal";
import { ID_ADMIN_USER } from "@/constants";

export default defineComponent({
  name: "Reports",
  props: {
    times: {
      type: Array as PropType<ITimes[]>,
      required: false
    }
  },
  setup() {
    return {
      reports: reactive(reportsList)
    };
  },
  computed: {
    currentAccount(): ICurrentAccount {
      return this.$store.state.currentAccount;
    }
  },
  methods: {
    createMyReportOnTimes() {
      this.$emit("getTimes", [
        this.currentAccount.isCompany ? ID_ADMIN_USER : this.currentAccount.id
      ]);
    },
    handleClickReportItem(
      report: IReportItem,
      key: IReportItems["currentName"]
    ) {
      if (key !== this.reports.currentName) {
        this.reports.currentName = key;

        if (this.reports.currentName === "myReportOnTime") {
          this.createMyReportOnTimes();
        }
      }
    }
  },
  watch: {
    times: {
      handler() {
        if (this.reports.currentName && this.times) {
          this.reports.current = this.reports.list[
            this.reports.currentName
          ].report(this.times);
        }
      }
    }
  }
});
