import axios, { AxiosResponse } from "axios";
import { Dispatch } from "react";
import { AppActionTypes, GET_CONFIGS } from "./types";

export const getConfigs = () => async (dispatch: Dispatch<AppActionTypes>, getState) => {
    const { token, user = {} } = getState().user;
    const response: AxiosResponse = await axios.get('/api/configs/admin/', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'userId': `${user._id}`
        }
    });
    const { data, status } = response;
    if (data.config) {
        dispatch({
           type: GET_CONFIGS,
           payload: data.config
        })
    }
}