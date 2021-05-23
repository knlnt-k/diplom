import { createStore } from "vuex";
import { ICurrentAccount, IIsCan } from "@/store/i-internal";
import { Accesses } from "@/infrastructure/constants";
import { ID_ADMIN_USER } from "@/constants";

export default createStore({
  state: {
    currentAccount: {
      id: 0,
      isCompany: false,
      name: "",
      access: 0,
      isAuth: false
    } as ICurrentAccount
  },
  mutations: {
    setCurrentAccount(state, data: ICurrentAccount) {
      state.currentAccount = data;
    }
  },
  actions: {},
  modules: {},
  getters: {
    isCan(state): IIsCan {
      const { access } = state.currentAccount;
      const pmAndAdmin =
        access === Accesses.admin || access === Accesses.task_editor;
      const admin = access === Accesses.admin;

      return {
        deleteProject: admin,
        editProject: admin,
        deleteTask: pmAndAdmin,
        editTask: pmAndAdmin,
        deleteComment(idUser) {
          return (
            idUser === state.currentAccount.id || state.currentAccount.isCompany
          );
        }
      };
    }
  }
});
