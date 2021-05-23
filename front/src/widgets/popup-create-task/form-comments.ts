import CreateForm from "@/components/form/create-form";

export default CreateForm({
  name: "formComments",
  disabled: false,
  elements: {
    comment: {
      nameComponent: "Textarea",
      initValue: "",
      vModel: "",
      props: {
        label: "Комментарий"
      },
      methods: {},
      get valid() {
        const isValid = !!this.vModel;

        return {
          isValid
        };
      }
    },
    submit: {
      nameComponent: "Button",
      initValue: "",
      vModel: "",
      props: {
        text: "Отправить"
      },
      methods: {}
    }
  },
  isValid: true,
  schema: [["comment"], ["submit"]]
});
