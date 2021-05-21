import { defineComponent, PropType, reactive } from "vue";

import Input from "@/components/input/input.vue";
import Textarea from "@/components/textarea.vue";
import Button from "@/components/button/button.vue";
import Selector from "@/components/selector/selector.vue";

import { IForm } from "@/components/form/i-internal";

export default defineComponent({
  name: "Form",
  components: {
    Input,
    Textarea,
    Button,
    Selector
  },
  props: {
    form: {
      type: Object as PropType<IForm>,
      required: true
    },
    action: String,
    method: String
  },
  methods: {
    getCountElementsInRow(row: string[]) {
      return row.filter(
        k => !("vIf" in this.form.elements[k]) || this.form.elements[k].vIf
      ).length;
    },
    getWidthCell(row: string[]) {
      const countElementsInRow = this.getCountElementsInRow(row);
      const margin = countElementsInRow === 1 ? 0 : 1.5;

      return {
        width: 100 / countElementsInRow - margin + "%"
      };
    }
  }
});
