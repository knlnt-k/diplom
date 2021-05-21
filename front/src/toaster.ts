export default {
  messages: [],
  alert(text, type = "error") {
    this.messages.push({ text, type });
    setTimeout(() => {
      this.messages.splice(0, 1);
    }, 5000);
  }
} as IToaster;

export interface IToaster {
  messages: {
    text: string;
    type: "error" | "success" | "warning" | "info";
  }[];
  alert(text: string, type?: "error" | "success" | "warning" | "info"): void;
}
