import CreateForm from "@/components/form/create-form";

export default CreateForm({
  name: "formTime",
  isValid: true,
  disabled: false,
  elements: {
    hours: {
      nameComponent: "Input",
      initValue: 0,
      vModel: 0,
      props: {
        label: "Часы",
        type: "number"
      },
      methods: {},
      get valid() {
        const isValid =
          !Number.isNaN(Number(this.vModel)) &&
          !String(this.vModel).includes(".") &&
          !(String(this.vModel).length !== 1 && String(this.vModel)[0] === "0");
        return { isValid };
      }
    },
    minutes: {
      nameComponent: "Input",
      initValue: 0,
      vModel: 0,
      props: {
        label: "Минуты",
        type: "number"
      },
      methods: {},
      get valid() {
        const isValid =
          !Number.isNaN(Number(this.vModel)) &&
          !String(this.vModel).includes(".") &&
          !(String(this.vModel).length !== 1 && String(this.vModel)[0] === "0");

        return { isValid };
      }
    },
    submit: {
      nameComponent: "Button",
      initValue: "",
      vModel: "",
      class: "popup-create-task__submit-time-wrapper",
      props: {
        text: "Добавить"
      },
      methods: {}
    }
  },
  schema: [["hours", "minutes", "submit"]]
});
