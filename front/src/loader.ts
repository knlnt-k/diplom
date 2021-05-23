export default {
  isLoad: false,
  toggle(isLoad?: boolean) {
    if (isLoad !== undefined) {
      this.isLoad = isLoad;
    } else {
      this.isLoad = !this.isLoad;
    }
  }
};
