import { get } from "../config";

export const SlugList = {
    index: (data) => get(`list-urls/static-pages`, { params: data }),
    blog: (data) => get(`list-urls/blog`, { params: data }),
    service: (data) => get(`list-urls/service`, { params: data }),
    company_pages: (data) => get(`list-urls/company-pages`, { params: data }),
    locations: (data) => get(`list-urls/location`, { params: data }),
    location_services: (data) => get(`list-urls/location/${data?.slug}`, { params: data }),
}
