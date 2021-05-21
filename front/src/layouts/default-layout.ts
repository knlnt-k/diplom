import { defineComponent } from "vue";

import Header from "./components/header/header.vue";
import LeftPanel from "./components/left-panel/left-panel.vue";
import PopupCreateTask from "@/widgets/popup-create-task/popup-create-task.vue";

import { ICurrentAccount, IIsCan } from "@/store/i-internal";

export default defineComponent({
  components: {
    Header,
    LeftPanel,
    PopupCreateTask
  },
  name: "DefaultLayout",
  data() {
    return {};
  },
  computed: {
    currentAccount(): ICurrentAccount {
      return this.$store.state.currentAccount;
    }
  },
  methods: {
    exit() {
      this.$infra.auth.unAuth();
    }
  }
});
