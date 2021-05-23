import { reactive, ref } from "vue";

import form from "@/widgets/popup-create-task/form";
import formTime from "./form-time";
import formComments from "./form-comments";

import { ITimes } from "@/infrastructure/times/i-internal";
import { IComment } from "@/infrastructure/comments-tasks/i-internal";

export default function() {
  const apiState = reactive({
    isLoad: false,
    isError: false
  });
  const formInit = reactive(form);
  const formTimeInit = reactive(formTime);
  const formCommentsInit = reactive(formComments);
  const setDisabledForms = (byForm: any) => {
    Object.defineProperty(byForm, "disabled", {
      get() {
        return apiState.isLoad;
      }
    });
  };
  const windowWidth = ref(0);

  setDisabledForms(formInit);
  setDisabledForms(formTimeInit);
  setDisabledForms(formCommentsInit);

  return {
    form: formInit,
    apiState,
    formTime: formTimeInit,
    formComments: formCommentsInit,
    times: ref([] as ITimes[]),
    comments: ref([] as IComment[]),
    windowWidth
  };
}
