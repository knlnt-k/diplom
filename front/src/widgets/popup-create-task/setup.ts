import { reactive } from "vue";
import form from "@/widgets/popup-create-task/form";
import formTime from "./form-time";

export default function() {
  const apiState = reactive({
    isLoad: false,
    isError: false
  });
  const formInit = reactive(form);
  const formTimeInit = reactive(formTime);
  const setDisabledForms = (byForm: any) => {
    Object.defineProperty(byForm, "disabled", {
      get() {
        return apiState.isLoad;
      }
    });
  };

  setDisabledForms(formInit);
  setDisabledForms(formTimeInit);

  return {
    form: formInit,
    apiState,
    formTime: formTimeInit
  };
}
