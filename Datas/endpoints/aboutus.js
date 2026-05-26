import { get } from "../config";

export const AboutUsApi = {
    page: (data) => get(`page/about`, { params: data }),
}

