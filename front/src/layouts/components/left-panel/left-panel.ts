import { defineComponent } from "vue";

import Button from "@/components/button/button.vue";

import nav from "./nav";

import { ICurrentAccount } from "@/store/i-internal";

export default defineComponent({
  data() {
    return {
      nav
    };
  },
  name: "LeftPanel",
  components: {
    Button
  },
  computed: {
    currentAccount(): ICurrentAccount {
      return this.$store.state.currentAccount;
    }
  },
  methods: {
    handleClickButton(name: string) {
      if (
        (name === "newProject" || name === "newTask") &&
        name in this.$popups.list
      ) {
        this.$popups.toggleVisible(name);
      }
    },
    handleClickNavItem() {
      this.$leftPanel.toggle();
    }
  }
});
