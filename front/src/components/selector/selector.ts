import { defineComponent } from "vue";

function debounce(callback: Function, delay: number) {
  let timeoutID: any = null;
  return function() {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      //@ts-ignore
      // eslint-disable-next-line prefer-rest-params
      callback.apply(this, arguments);
    }, delay);
  };
}

export default defineComponent({
  name: "Selector",
  props: {
    modelValue: [String, Number, Array],
    currentIndexValue: { type: Number, required: false },
    options: {
      type: Array,
      required: true
    },
    valueField: {
      type: String,
      required: false
    },
    textField: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    valueNeverField: {
      required: false,
      default: ""
    },
    isTitle: {
      type: Boolean,
      required: false,
      default: true
    },
    isSearch: {
      type: Boolean,
      required: false,
      default: false
    },
    className: {
      type: String,
      required: false,
      default: ""
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    isViewClearButton: {
      type: Boolean,
      required: false,
      default: true
    },
    placeholder: {
      type: String,
      required: false,
      default: ""
    },
    isError: {
      type: Boolean,
      required: false,
      default: false
    },
    errorText: {
      type: String,
      required: false
    },
    isRequired: {
      type: Boolean,
      required: false,
      default: false
    },
    isNotClear: {
      type: Boolean,
      required: false,
      default: false
    },
    disabled: Boolean
  },
  data() {
    return {
      isOpen: false,
      isMouseEnter: false,
      searchText: "",
      isSelectAll: false,
      currentOptions: [] as Array<any>
    };
  },
  computed: {
    isShowClearButton(): boolean {
      return !!(this.isViewClearButton && !this.isSelectNeverValue);
    },
    viewOptions(): Array<any> {
      const filteredOptions = (this.options || []).filter(o => {
        return !this.currentOptions.find(
          co =>
            JSON.stringify(this.getValue(co)) ===
            JSON.stringify(this.getValue(o))
        );
      });

      if (
        filteredOptions[0] &&
        this.getValue(filteredOptions[0]) === this.valueNeverField
      ) {
        this.currentOptions.forEach((option, index) =>
          filteredOptions.splice(index + 1, 0, option)
        );
        return filteredOptions;
      } else {
        return this.currentOptions.concat(filteredOptions);
      }
    },
    isSelectNeverValue(): boolean {
      return (
        (!this.multiple &&
          (!this.currentOptions.length ||
            this.modelValue === this.valueNeverField)) ||
        (this.multiple && !this.currents.length)
      );
    },
    current(): string {
      if (this.multiple) {
        return "Выбрано: " + this.currents.length;
      } else {
        return this.currentOptions.length && this.currentOptions[0]
          ? this.textField
            ? this.currentOptions[0][this.textField]
            : this.currentOptions[0]
          : "";
      }
    },
    currents(): Array<any> {
      return this.multiple &&
        this.modelValue !== this.valueNeverField &&
        (this.modelValue as string).length !== 0
        ? Array.isArray(this.modelValue)
          ? this.modelValue
          : [this.modelValue]
        : [];
    },
    classNamesForOptionSelectAll(): Array<any> {
      return [
        "select__option_multiple",
        {
          [this.className + "__option"]: this.className,
          select__option_current: this.isSelectAll,
          [this.className + "__option_current"]:
            this.isSelectAll && this.className,
          [this.className + "__option_multiple"]: this.className
        }
      ];
    }
  },
  methods: {
    debouncedEmitOfSearchInput() {
      debounce(this.handleSearch, 1000);
    },
    getClassNamesForOption(option: any) {
      const value = this.getValue(option);
      const emptyCondition =
        "valueNeverField" in ((this.$options || {}).propsData || {}) &&
        this.valueNeverField === value;
      const currentCondition = this.multiple
        ? this.currents.findIndex(
            current => JSON.stringify(current) === JSON.stringify(value)
          ) !== -1
        : JSON.stringify(this.modelValue) === JSON.stringify(value);
      const modifierCondition =
        option && typeof option === "object" && "modifier" in option;

      return [
        modifierCondition ? "select__option_" + option.modifier : "",
        modifierCondition && this.className
          ? this.className + "__option_" + option.modifier
          : "",
        {
          [this.className + "__option"]: this.className,
          select__option_empty: emptyCondition,
          select__option_current: currentCondition,
          [this.className + "__option_empty"]: emptyCondition && this.className,
          [this.className + "__option_current"]:
            currentCondition && this.className,
          ["select__option_multiple"]: this.multiple,
          [this.className + "__option_multiple"]:
            this.className && this.multiple
        }
      ];
    },
    handleClickOption(option: any, index: number) {
      const clickValue = this.getValue(option);

      if (clickValue === this.valueNeverField) {
        this.handleClickClearButton();
      } else {
        let value = clickValue;

        if (this.multiple) {
          const currents = [...this.currents];
          const existIndex = currents.findIndex(
            v => JSON.stringify(v) === JSON.stringify(clickValue)
          );

          if (existIndex !== -1) {
            if (this.isSelectAll) this.isSelectAll = false;
            currents.splice(existIndex, 1);
            value = currents;
          } else {
            if (
              this.currents.length ===
                this.viewOptions.length -
                  (this.viewOptions.findIndex(
                    option =>
                      JSON.stringify(this.getValue(option)) ===
                      JSON.stringify(this.valueNeverField)
                  ) === -1
                    ? 1
                    : 2) &&
              !this.isSelectAll
            )
              this.isSelectAll = true;

            value = [clickValue].concat(currents);
          }
        }

        this.$emit("update:modelValue", value);
      }

      this.isOpen = !!this.multiple;
    },
    handleClickCurrent() {
      this.isOpen = !this.isOpen;
      if (this.isSearch && this.isOpen) {
        this.searchText = "";
        this.$nextTick(() => {
          (this.$refs.smallSelectOrSearchInput as HTMLElement).focus();
        });
      }
    },
    handleSearch(event: InputEvent) {
      if ("handleSearch" in this.$attrs) {
        this.$emit("handleSearch", event);
      }
    },
    handleClickClearButton() {
      if (this.multiple) this.isSelectAll = false;
      this.$emit("update:modelValue", this.valueNeverField);
    },
    handleClickOptionSelectAll() {
      this.isSelectAll = !this.isSelectAll;

      this.$emit(
        "update:modelValue",
        this.isSelectAll
          ? this.viewOptions.reduce((acc, option) => {
              if (this.getValue(option) !== this.valueNeverField) {
                acc.push(this.getValue(option));
              }

              return acc;
            }, [])
          : this.valueNeverField || []
      );
    },
    getValue(option: any) {
      return this.valueField ? option[this.valueField] : option;
    },
    getCurrentOptions(): Array<any> {
      return this.viewOptions.filter(option => {
        return this.multiple && Array.isArray(this.modelValue)
          ? this.modelValue.findIndex(val => {
              return (
                JSON.stringify(this.getValue(option)) === JSON.stringify(val)
              );
            }) !== -1
          : JSON.stringify(this.getValue(option)) ===
              JSON.stringify(this.modelValue);
      });
    },
    clickOutside() {
      if (!this.isMouseEnter && this.isOpen) {
        this.isOpen = false;
      }
    }
  },
  beforeMount() {
    if (
      this.options &&
      this.options.length &&
      this.getCurrentOptions().length
    ) {
      this.currentOptions = this.getCurrentOptions();
    }

    document.body.addEventListener("click", this.clickOutside);
    document.body.addEventListener("keypress", this.clickOutside);
  },
  beforeUnmount() {
    document.body.removeEventListener("click", this.clickOutside);
    document.body.removeEventListener("keypress", this.clickOutside);
  },
  watch: {
    modelValue() {
      this.currentOptions = this.getCurrentOptions();
    },
    options(options: Array<any>) {
      if (options && options.length && this.getCurrentOptions().length) {
        this.currentOptions = this.getCurrentOptions();
      }
    }
  }
});
