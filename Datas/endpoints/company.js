import { get } from "../config";

// The "company" pages - privacy policy, terms and conditions, and whatever
// else gets added in the CMS - are all one content type behind /company/<slug>.
export const CompanyApi = {
  list: (data) => get(`company-page-list`, { params: data }),
  detail: (data) => get(`company-page/${data?.slug}`),
};
