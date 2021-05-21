import { IForm, InitialForm } from "@/components/form/i-internal";

export default function CreateForm(form: InitialForm): IForm {
  return {
    ...form,
    validate(isReset = false) {
      if (isReset) {
        this.isValid = true;
      } else {
        const s = Object.values(this.elements).filter(
          element => element.valid !== undefined && !element.valid.isValid
        );

        this.isValid = !s.length;
      }
    },
    clear() {
      Object.values(this.elements).forEach(element => {
        element.vModel = element.initValue;
      });

      this.isValid = true;
    }
  };
}
