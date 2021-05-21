import { Company } from "@/views/home-page/i-internal";
import { GetCompaniesResponse } from "@/infrastructure/companies/i-external";

export const getCompaniesResponseToCompany: (
  response: GetCompaniesResponse
) => Company[] = response => {
  return response.companies && response.companies.length
    ? response.companies.map(company => ({
        id: company.id,
        name: company.name
      }))
    : [];
};
