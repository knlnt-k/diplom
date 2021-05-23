import { defineComponent, ref } from "vue";

import Reports from "@/views/reports-page/components/reports.vue";
import { ERROR_MSG } from "@/constants";
import { ITimes } from "@/infrastructure/times/i-internal";
import { TimesToInternal } from "@/infrastructure/times/adapters/times-to-internal";

export default defineComponent({
  name: "ReportsPage",
  components: {
    Reports
  },
  setup() {
    return {
      times: ref([] as ITimes[])
    };
  },
  methods: {
    getTimes(userIDs: number[]) {
      this.$infra.times
        .getTimes({
          filter: {
            user_ids: userIDs
          }
        })
        .then(response => {
          const { answer, error } = response;

          if (error) {
            this.$toaster.alert(error.message || ERROR_MSG);
          }

          if (answer && answer.times) {
            this.times = answer.times.map(t => TimesToInternal(t));
          }
        });
    }
  }
});
