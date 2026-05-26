import { get } from "../config";

export const PackagesApi = {
    page: (data) => get(`page/packages`, { params: data }),
    package: (data) => get(`/package`, { params: data }),
}

