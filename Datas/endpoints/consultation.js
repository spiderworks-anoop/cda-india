import { get } from "../config";

export const ConsultationApi = {
    page: (data) => get(`page/free-consultation`, { params: data })
}

 