import { get } from "../config";

export const ServicesApi = {
    page: (data) => get(`page/service`, { params: data }),
    listpage: (data) => get(`/service`, { params: data }),
    serviceDetail: (data) => get(`/service/${data.slug}`)

    
}

