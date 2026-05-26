import { get } from "../config";

export const ClientsApi = {
    page: (data) => get(`page/clients`, { params: data })
}

