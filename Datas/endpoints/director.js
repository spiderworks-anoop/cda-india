import { get } from "../config";

export const DirectorApi = {
    page: (data) => get(`page/message-from-director`, { params: data })
}

