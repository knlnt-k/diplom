import { defineComponent, PropType, ref } from "vue";

import List from "@/components/list/list.vue";
import Selector from "@/components/selector/selector.vue";
import Input from "@/components/input/input.vue";

import { IUser } from "@/infrastructure/users/i-internal";
import { getObjectFromEnum } from "@/infrastructure/services/get-object-from-enum";
import { Accesses } from "@/infrastructure/constants";
import { getAccessObject } from "@/infrastructure/services/get-access-object";

export default defineComponent({
  name: "Users",
  components: {
    List,
    Selector,
    Input
  },
  props: {
    users: {
      type: Array as PropType<IUser[]>,
      required: true
    },
    apiState: {
      type: Object as PropType<{
        isLoadUsers: boolean;
      }>,
      required: true
    }
  },
  setup() {
    return {
      search: ref("")
    };
  },
  computed: {
    usersFiltered(): IUser[] {
      return this.users.filter(
        user =>
          user.fullName.toLowerCase().includes(this.search.toLowerCase()) ||
          user.login.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  data() {
    return {
      accesses: getObjectFromEnum(Accesses, getAccessObject)
    };
  }
});
