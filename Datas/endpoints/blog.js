import { get } from "../config";

export const BlogApi = {
    listpage: (data) => get(`/blogs`, { params: data }),
    page: (data) => get(`page/blog` , {params: data}),
    blogDetail: (data) => get(`/blogs/${data.slug}`),
    athorDetail: (data) => get(`/blog/author/${data.slug}`)
}

