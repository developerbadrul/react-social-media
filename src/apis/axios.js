import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// console.log("url check",BASE_URL);

// public axios

export const publicApi = axios.create({
    baseURL: BASE_URL,
})


export const privateApi = axios.create({
    baseURL: BASE_URL,
})