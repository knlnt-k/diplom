import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    text: {
      type: String,
      required: false
    },
    disabled: Boolean,
    type: {
      required: false,
      type: String as PropType<"delete">
    }
  }
});
