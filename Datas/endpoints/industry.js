import { get } from "../config";

export const IndustryApi = {
      page: (data) => get(`/industry`, { params: data }),
    // listpage: (data) => get(`/service`, { params: data }),
    industryDetail: (data) => get(`/industry/${data.slug}`)

 
}

