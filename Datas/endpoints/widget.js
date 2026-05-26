import { get } from "../config";

export const WidgetApi = { 
    financialSolutions : (data) => get(`widget/trusted_financial_solutions` , {params: data}),
    certifications : (data) => get(`widget/our_certifications` , {params: data}),
    process : (data) => get(`widget/smart_accounting` , {params: data}),  
    ourassociates : (data) => get(`widget/our_associates` , {params: data}),
    faqrigthtext : (data) => get(`widget/need_expert_advice` , {params: data}),
    exceptionalclients : (data) => get(`widget/our_exceptional_clients` , {params: data}),
    testimonials : (data) => get(`/testimonials` , {params: data})   


 

    
}

