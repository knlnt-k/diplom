import CreateForm from "@/components/form/create-form";
import { Accesses, Profession } from "@/infrastructure/constants";
import { getObjectFromEnum } from "@/infrastructure/services/get-object-from-enum";
import { getAccessObject } from "@/infrastructure/services/get-access-object";
import { getProfessionObject } from "@/infrastructure/services/get-profession-object";

export default CreateForm({
  name: "updateUser",
  disabled: false,
  elements: {
    name: {
      nameComponent: "Input",
      initValue: "",
      vModel: "",
      props: {
        label: "Имя"
      },
      methods: {},
      get valid() {
        const isValid = this.vModel != "" && this.vModel.length < 30;

        return {
          isValid
        };
      }
    },
    lastName: {
      nameComponent: "Input",
      initValue: "",
      vModel: "",
      props: {
        label: "Фамилия"
      },
      methods: {}
    },
    profession: {
      nameComponent: "Selector",
      initValue: Profession.none,
      vModel: Profession.none,
      props: {
        options: getObjectFromEnum(Profession, getProfessionObject).splice(1),
        textField: "text",
        valueField: "id",
        label: "Профессия",
        isNotClear: true,
        className: "selector-for-forms"
      },
      methods: {}
    },
    info: {
      nameComponent: "",
      initValue: "",
      vModel: "",
      props: {},
      methods: {},
      html: `<div class="info-message">Для изменения доступа обратитесь к администратору компании</div> `
    },
    submit: {
      nameComponent: "Button",
      initValue: "",
      vModel: "",
      props: {
        text: "Сохранить"
      },
      methods: {}
    }
  },
  schema: [["name", "lastName"], ["profession"], ["info"], ["submit"]],
  isValid: true
});
