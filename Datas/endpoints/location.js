import { get } from "../config";

export const LocationApi = {
    page: (data) => get(`/page/location`, { params: data }),
    listpage: (data) => get(`/location`, { params: data }),
    locationDetail: (data) => get(`/location/${data.slug}`),
    location_service_detail: (data) => get(`/location/${data.slug}/${data.child}`)
}
