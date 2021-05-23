import { defineComponent } from "vue";

import { ICurrentAccount } from "@/store/i-internal";

export default defineComponent({
  name: "Header",
  computed: {
    currentAccount(): ICurrentAccount {
      return this.$store.state.currentAccount;
    }
  },
  data() {
    return {
      isShowUserMenu: false,
      isMouseEnterOnUserMenu: false
    };
  },
  beforeMount() {
    document.body.addEventListener("click", this.closeUserMenu);
    document.body.addEventListener("keypress", this.closeUserMenu);
  },
  beforeUnmount() {
    document.body.removeEventListener("click", this.closeUserMenu);
    document.body.removeEventListener("keypress", this.closeUserMenu);
  },
  methods: {
    closeUserMenu() {
      if (!this.isMouseEnterOnUserMenu) {
        this.isShowUserMenu = false;
      }
    },
    handleClickUserMenuSettings() {
      if (!this.currentAccount.isCompany) {
        this.$popups.list["updateUser"].payload.id = this.currentAccount.id;
        this.$popups.toggleVisible("updateUser");
      }
    }
  }
});
