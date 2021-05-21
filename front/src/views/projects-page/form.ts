import CreateForm from "@/components/form/create-form";

export default CreateForm({
  name: "newProject",
  disabled: false,
  elements: {
    name: {
      nameComponent: "Input",
      initValue: "",
      vModel: "",
      props: {
        label: "Название",
        required: true
      },
      methods: {},
      get valid() {
        const isValid = this.vModel !== "";

        return {
          isValid
        };
      }
    },
    description: {
      nameComponent: "Textarea",
      initValue: "",
      vModel: "",
      props: {
        label: "Описание"
      },
      methods: {}
    },
    submit: {
      nameComponent: "Button",
      initValue: "",
      vModel: "",
      props: {
        text: ""
      },
      methods: {
        click: () => {
          //
        }
      }
    }
  },
  schema: [["name"], ["description"], ["submit"]],
  isValid: true
});
