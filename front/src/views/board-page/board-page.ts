import { defineComponent } from "vue";

import Board from "./components/board/board.vue";
import { ICurrentAccount } from "@/store/i-internal";
import { IProject } from "@/infrastructure/projects/i-internal";
import { projectToInternal } from "@/infrastructure/projects/adapters/projectToInternal";

export default defineComponent({
  name: "BoardPage",
  components: {
    Board
  },
  data() {
    return {
      projects: [] as IProject[]
    };
  },
  beforeMount() {
    this.init();
  },
  computed: {
    currentAccount(): ICurrentAccount {
      return this.$store.state.currentAccount;
    }
  },
  methods: {
    init() {
      this.getProjects();
    },
    getProjects() {
      this.$infra.projects
        .getProjects({
          ids: [],
          filter: { company_ids: [this.currentAccount.companyID] }
        })
        .then(response => {
          this.projects = (response.answer?.projects || []).map(project =>
            projectToInternal(project)
          );
        });
    },
    getTasks() {
      //
    }
  }
});
