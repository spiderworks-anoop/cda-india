import { get } from "../config";

export const TeamApi = {
    page: (data) => get(`page/our-team`, { params: data }),
    members: (data) => get(`team`, { params: data }),
}

