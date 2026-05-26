import { get } from "../config";

export const SlugList = {
    index: (data) => get(`list-urls/static-pages`, { params: data }),
    blog: (data) => get(`list-urls/blog`, { params: data }),
    service: (data) => get(`list-urls/service`, { params: data }),
}
