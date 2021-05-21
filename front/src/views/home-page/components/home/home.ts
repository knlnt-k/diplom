import { defineComponent, PropType } from "vue";

import Input from "@/components/input/input.vue";
import Button from "@/components/button/button.vue";
import Selector from "@/components/selector/selector.vue";

import { IFormData } from "@/views/home-page/i-internal";

export default defineComponent({
  name: "Home",
  components: {
    Input,
    Button,
    Selector
  },
  props: {
    formData: {
      type: Object as PropType<IFormData>,
      required: true
    },
    companies: Array
  },
  data: () => {
    return {};
  },
  methods: {
    handleClickCreateCompanyButton() {
      this.$emit("authorization");
    }
  }
});
