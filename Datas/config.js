import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_PATH,
})

const isServer = typeof window === "undefined";

apiClient.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
    };

    // Merge, don't replace - overwriting `headers` wholesale drops the axios
    // defaults (Content-Type on posts, etc).
    config.headers = {
        ...config.headers,
        Accept: "application/json",
        // "Cache-Control" is not a CORS safelisted request header, so sending
        // it from the browser turns every call into a preflighted OPTIONS
        // request that the API does not answer. Only send it server side,
        // where CORS does not apply.
        ...(isServer ? { "Cache-Control": "no-store" } : {}),
    };

    return config;
},
    error => Promise.reject(error),
);

apiClient.interceptors.response.use((response) =>
    response,
    async (error) => {
        return Promise.reject(error.response?.data);
    },
);


const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };


