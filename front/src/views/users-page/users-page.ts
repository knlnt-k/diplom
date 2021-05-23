import { defineComponent, ref } from "vue";

import Users from "./components/users.vue";
import { IUser } from "@/infrastructure/users/i-internal";
import { ICurrentAccount } from "@/store/i-internal";
import { ERROR_MSG } from "@/constants";
import { UserToIUser } from "@/infrastructure/users/adapters/user-to-i-user";

export default defineComponent({
  name: "UsersPage",
  components: {
    Users
  },
  computed: {
    currentAccount(): ICurrentAccount {
      return this.$store.state.currentAccount;
    }
  },
  setup() {
    return {
      users: ref([] as IUser[])
    };
  },
  data() {
    return {
      apiState: {
        isLoadUsers: false
      }
    };
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      this.getUsers();
    },
    getUsers() {
      const { currentAccount } = this;

      this.apiState.isLoadUsers = true;
      this.$infra.users
        .getUsers({
          ids: [],
          filter: {
            companyIDs: [currentAccount.companyID]
          }
        })
        .then(response => {
          const { answer, error } = response;

          this.apiState.isLoadUsers = false;

          if (error) {
            this.$toaster.alert(error.message || ERROR_MSG);
            return;
          }

          if (answer && answer.users) {
            this.users = answer.users.map(user => UserToIUser(user));
          }
        });
    },
    updateUser(user: IUser) {
      this.$loader.toggle();

      this.$infra.users
        .updateUser({
          id: user.id,
          name: user.name,
          last_name: user.lastName,
          login: user.login,
          company_id: user.companyID,
          profession: user.profession.id,
          access: user.access.id
        })
        .then(response => {
          const { answer, error } = response;

          this.$loader.toggle();

          if (error) {
            this.$toaster.alert(error.message || ERROR_MSG);
          }

          if (answer && answer.id) {
            this.$toaster.alert("Доступ успешно изменен", "success");
            this.getUsers();
          }
        });
    },
    changeUserAccess(user: IUser) {
      this.updateUser(user);
    }
  }
});
