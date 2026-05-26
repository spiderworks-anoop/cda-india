import { get } from "../config";

export const HomeApi = { 
    page: (data) => get(`page/index` , {params: data}),  
}

