import { defineComponent } from "vue";

import Home from "./components/home/home.vue";

import { Company, IFormData } from "@/views/home-page/i-internal";
import { getCompaniesResponseToCompany } from "@/infrastructure/companies/adapters/get-companies-response-to-company";
import { signInResponseToToken } from "@/infrastructure/auth/adapters/sign-in-response-to-token";
import { ROUTES } from "@/infrastructure/config/routes";
import { ERROR_MSG } from "@/constants";

export default defineComponent({
  name: "HomePage",
  components: {
    Home
  },
  data() {
    return {
      formData: {
        isCompany: false,
        isSignUp: false,
        name: "",
        login: "",
        password: "",
        companyID: 0
      } as IFormData,
      companies: [] as Company[]
    };
  },
  beforeMount() {
    if (this.$infra.auth.isAuth()) {
      this.$router.push(ROUTES.board.path);
    } else {
      this.getAndSetAllCompanies();
    }
  },
  methods: {
    authorization() {
      const {
        login,
        password,
        name,
        companyID,
        isCompany,
        isSignUp
      } = this.formData;
      const request: any = { login, password };
      let handler:
        | "signUpCompany"
        | "signInCompany"
        | "signUpUser"
        | "signInUser";
      const thenHandle = (response: any) => {
        const { answer, error } = response;

        if (error) {
          this.$toaster.alert(error.message || ERROR_MSG);
        }

        if (answer) {
          if (answer.token) {
            this.$infra.auth.setToken(signInResponseToToken(answer));
          }
          window.location.reload();
        }
      };

      if (isCompany) {
        if (isSignUp) {
          handler = "signUpCompany";
          request.name = name;
        } else {
          handler = "signInCompany";
        }
      } else {
        request.company_id = companyID;
        if (isSignUp) {
          handler = "signUpUser";
          request.name = name;
        } else {
          handler = "signInUser";
        }
      }

      if (handler) {
        this.$infra.auth[handler](request).then(thenHandle);
      }
    },
    getAndSetAllCompanies() {
      this.$infra.companies.getCompanies({ ids: [] }).then(response => {
        this.companies = getCompaniesResponseToCompany(response.answer);
      });
    }
  }
});
