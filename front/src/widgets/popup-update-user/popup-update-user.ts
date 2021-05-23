import { defineComponent, reactive, ref } from "vue";

import Popup from "@/components/popup/popup.vue";
import Form from "@/components/form/form.vue";
import form from "@/widgets/popup-update-user/form";
import { ERROR_MSG } from "@/constants";
import { IUser } from "@/infrastructure/users/i-internal";
import { UserToIUser } from "@/infrastructure/users/adapters/user-to-i-user";
import { ICurrentAccount } from "@/store/i-internal";

export default defineComponent({
  name: "PopupUpdateUser",
  components: {
    Popup,
    Form
  },
  setup() {
    return {
      form: reactive(form),
      user: reactive({} as IUser)
    };
  },
  computed: {
    currentAccount(): ICurrentAccount {
      return this.$store.state.currentAccount;
    },
    isVisible(): boolean {
      return this.$popups.list["updateUser"].visible;
    }
  },
  data() {
    return {
      apiState: {
        isLoad: false
      }
    };
  },
  beforeMount() {
    this.init();
  },
  methods: {
    handleClose() {
      this.form.clear();
      this.$popups.toggleVisible("updateUser");
    },
    init() {
      if (this.$popups.list.updateUser.payload.id && this.isVisible) {
        this.getUsers(this.$popups.list.updateUser.payload.id);
      }
      this.initialForm();
    },
    initialForm(user?: IUser) {
      if (user) {
        this.form.elements.name.initValue = user.name;
        this.form.elements.name.vModel = user.name;
        this.form.elements.lastName.initValue = user.lastName;
        this.form.elements.lastName.vModel = user.lastName;
        this.form.elements.profession.initValue = user.profession.id;
        this.form.elements.profession.vModel = user.profession.id;
        this.user.fullName = user.fullName;
      } else {
        const { apiState } = this;

        Object.defineProperty(this.form, "disabled", {
          get() {
            return apiState.isLoad;
          }
        });

        this.form.elements.submit.methods.click = this.updateUser;
      }
    },
    getUsers(id: number) {
      this.apiState.isLoad = true;
      this.$infra.users
        .getUsers({
          ids: [id],
          filter: { companyIDs: [this.currentAccount.companyID] }
        })
        .then(response => {
          const { answer, error } = response;

          this.apiState.isLoad = false;

          if (error) {
            this.$toaster.alert(error.message || ERROR_MSG);
            return;
          }

          if (answer && answer.users) {
            const user = UserToIUser(answer.users[0]);

            this.initialForm(user);
            this.user = user;
          }
        });
    },
    updateUser() {
      const { name, lastName, profession } = this.form.elements;
      const { login, id, companyID, access } = this.user;

      if (this.form.validate != undefined) {
        this.form.validate();

        if (!this.form.isValid) {
          return;
        }
      }

      this.apiState.isLoad = true;

      this.$infra.users
        .updateUser({
          id,
          name: name.vModel,
          last_name: lastName.vModel,
          login,
          access: access.id,
          company_id: companyID,
          profession: profession.vModel
        })
        .then(response => {
          const { answer, error } = response;

          this.apiState.isLoad = false;

          if (error) {
            this.$toaster.alert(error.message || ERROR_MSG);
            return;
          }

          if (answer && answer.id) {
            if (this.currentAccount.name !== name.vModel) {
              this.$store.commit("setCurrentAccount", {
                ...this.currentAccount,
                name: name.vModel
              });
            }
            this.$toaster.alert("Профиль успешно изменен", "success");
            this.handleClose();
          }
        });
    }
  },
  watch: {
    isVisible() {
      if (this.isVisible) {
        this.init();
      }
    }
  }
});
