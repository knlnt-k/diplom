import { defineComponent, PropType } from "vue";

import { IPagination } from "@/infrastructure/i-internal";

export default defineComponent({
  name: "List",
  props: {
    rows: {
      type:Array,
      required: true
    },
    pagination: {
      type: Object as PropType<IPagination>,
      required: false
    }
  },
  data() {
    return {
      splitter: "-"
    };
  },
  computed: {
    visiblePagination(): boolean {
      return this.pagination ? this.pagination.total > this.pagination.limit : false;
    },
    currentPage(): number {
      return this.pagination ? Math.ceil(this.pagination.offset / this.pagination.limit) + 1 : 0;
    },
    countPages(): number {
      return this.pagination ? Math.ceil(this.pagination.total / this.pagination.limit) : 0;
    },
    pages(): Array<string | number> | number {
      if (this.countPages > 7) {
        const pages = [this.currentPage];

        if (this.currentPage < 3) {
          return [1, 2, 3, this.splitter, this.countPages];
        } else if (this.currentPage >= this.countPages - 2) {
          return [
            1,
            this.splitter,
            this.countPages - 3,
            this.countPages - 2,
            this.countPages - 1,
            this.countPages
          ];
        } else {
          return [
            1,
            this.splitter,
            this.currentPage - 1,
            this.currentPage,
            this.currentPage + 1,
            this.splitter,
            this.countPages
          ];
        }
      } else {
        return this.countPages;
      }
    }
  },
  methods: {
    handleClickPage(page: number | string) {
      if (page !== this.currentPage && page !== this.splitter) {
        this.$emit("changePage", Number(page) - 1);
      }
    }
  }
});
