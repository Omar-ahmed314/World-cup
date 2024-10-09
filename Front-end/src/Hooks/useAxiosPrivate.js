import { useEffect } from "react";
import { axiosPrivate } from "../axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
    const {auth, setAuth} = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            request => {
                if(!request.headers['Authorization'])
                {
                    request.headers['Authorization'] =  `Bearer ${auth?.accessToken}`;
                }
                return request;
            },
            err => Promise.reject(err)
        );

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async (err) => {
                const prevRequest = err?.config;
                const response = err?.response;
                if(response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return err;
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor);
            axiosPrivate.interceptors.response.eject(responseInterceptor);
        }
    }, []);

    return axiosPrivate;
}

export default useAxiosPrivate;