import { get } from "../config";

export const PrivacyPolicyApi = {
  privacyPolicy: (data) => get(`company-page/privacy-policy`, { params: data }),
};
