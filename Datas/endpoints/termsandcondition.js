import { get } from "../config";

export const TermsAndConditionsApi = {
  termsConditions: (data) =>
    get(`company-page/terms-and-conditions`, { params: data }),
};
