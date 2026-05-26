import { get } from "../config";

export const GeneralApi = {
    general: (data) => get(`general-settings`, { params: data }),
}

