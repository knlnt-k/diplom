import { reactive } from "vue";
import filterForm from "@/views/tasks-page/filter-form";

const setup = () => {
  const formFilterInit = reactive(filterForm);
  const setVif = (field: string) => {
    if ("vIf" in formFilterInit.elements[field]) {
      Object.defineProperty(formFilterInit.elements[field], "vIf", {
        get() {
          return formFilterInit.elements.isOpenExtendsFilter.vModel;
        }
      });
    }
  };

  Object.defineProperty(
    formFilterInit.elements.isOpenExtendsFilter.props,
    "isOpen",
    {
      get() {
        return formFilterInit.elements.isOpenExtendsFilter.vModel;
      }
    }
  );

  setVif("userIDs");
  setVif("projectIDs");
  setVif("sortFields");
  setVif("statuses");
  setVif("asc");

  return {
    formFilter: formFilterInit
  };
};

export default setup;
