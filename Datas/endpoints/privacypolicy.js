import { get } from "../config";

export const PrivacyPolicyApi = {
  privacyPolicy: (data) => get(`company-page/${data?.slug}`, { params: data }),
};
