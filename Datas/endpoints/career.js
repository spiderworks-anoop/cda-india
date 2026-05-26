import { get } from "../config";

export const CareerApi = {
    listpage: (data) => get(`/jobs`, { params: data }),
    page: (data) => get(`page/careers` , {params: data})
}

