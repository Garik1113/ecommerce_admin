import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/store";
import { handleThrowError } from "src/store/actions/error/error";

export const useAxiosClient = () => {
    const { token, user = {} } = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch();
    const headers = useMemo(() => {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'userId': `${user._id}`
        }
    }, [token, user]);

    const axiosClient = useCallback( async(method: Method, url: string, data?: any, contentType?: string) => {
        const config: AxiosRequestConfig = {
            headers: {
                ...headers,
                'Content-Type': contentType ? contentType : 'application/json',
            },
            method,
            url,
            data
        }
        const response: AxiosResponse = await axios(config);
        
        if (response.status !== 200) {
            dispatch(handleThrowError(response.data))
        }
        
        return response;
    }, [headers, user]);

    return {
        axiosClient
    }
}