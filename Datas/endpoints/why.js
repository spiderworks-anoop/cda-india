import { get } from "../config";

export const WhyApi = {
    page: (data) => get(`page/why-cda`, { params: data })
}

