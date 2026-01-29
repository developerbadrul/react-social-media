import { useEffect } from "react";
import useAuth from "./useAuth";
import { privateApi, publicApi } from "../apis/axios";

const usePrivateAxios = () => {
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        // Add a request interceptor for private apis
        const requestIntercept = privateApi.interceptors.request.use(
            (config) => {
                const authToken = auth?.authToken;
                if (authToken) {
                    config.headers.Authorization = `Bearer ${authToken}`;
                }
                return config;
            },

            (error) => Promise.reject(error)
        )

        // Add a response interceptor for private apis
        const responseIntercept = privateApi.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const refreshToken = auth?.refreshToken;

                        const response = await publicApi.post(`/auth/refresh-token`, { refreshToken });
                        const { token } = response.data;
                        console.log(`New Token: ${token}`);

                        setAuth({ ...auth, authToken: token });
                        originalRequest.headers.Authorization = `Bearar ${token}`;
                        return publicApi(originalRequest);
                    } catch (error) {
                        throw Error(error);
                    }
                }
            }

        )
        return () => {
            privateApi.interceptors.request.eject(requestIntercept)
            privateApi.interceptors.response.eject(responseIntercept)
        }
        
    }, [])

};

export default usePrivateAxios;