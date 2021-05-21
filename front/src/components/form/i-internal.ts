export interface InitialForm {
  name: string;
  disabled?: boolean;
  validate?: Function;
  clear?: Function;
  isValid?: boolean;
  elements: {
    [key: string]: IElementForm;
  };
  schema: string[][];
}

export interface IForm extends InitialForm {
  validate: Function;
  clear: Function;
}

export interface IElementForm {
  isPrimitive?: boolean;
  nameComponent: "Input" | "Selector" | "Textarea" | "Button" | "custom";
  component?: any;
  initValue: any;
  vModel: any;
  vIf?: boolean;
  class?: string;
  props: Record<string, any>;
  methods: Record<string, any>;
  slots?: {
    name: string;
    slot: (payload: any) => string;
  }[];
  style?: Record<string, any>;
  valid?: {
    isValid: boolean;
    error?: string;
  };
}
