import { defineComponent } from "vue";

export default defineComponent({
  name: "Input",
  props: {
    modelValue: [String, Number],
    value: {
      type: [String, Number],
      required: false
    },
    placeholder: String,
    type: {
      type: String,
      default: "text"
    },
    name: {
      type: String,
      required: false
    },
    label: String,
    id: String,
    disabled: Boolean,
    required: Boolean
  },
  emits: ["update:modelValue"]
});
