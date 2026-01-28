import axios from "axios";

const BASE_URL = import.meta.env.BASE_URL;

// public axios

export const publicApi = axios.create({
    baseURL: BASE_URL,
})


export const privateApi = axios.create({
    baseURL: BASE_URL,
})