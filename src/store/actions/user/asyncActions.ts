import axios, { AxiosResponse } from "axios";
import { Dispatch } from "react";
import { history } from "src/App";
import { AppState } from "src/store";
import { IUser } from "src/store/reducers/user";
import { SIGN_IN, SIGN_OUT, UserActionTypes } from "./types";

export const signin = (user: IUser) => async (dispatch: Dispatch<UserActionTypes>) => {
    const signinResponse: AxiosResponse = await axios.post('api/users/admin/signin', 
        {
            email: user.email, 
            password: user.password
        }
    );
    const { data, status } = signinResponse;
    if ( data.token && status == 200 ) {
        const payload = {
            user: data.user,
            token: data.token
        };
        dispatch({
            type: SIGN_IN,
            payload
        });
        history.push('/');
    }
    
      
}

export const signup = (user: IUser) => async (dispatch: Dispatch<UserActionTypes>, getState: AppState) => {
    const response: AxiosResponse = await axios.post('api/users/admin/signup', user);
    const { data: signupData, status } = response;
    if (signupData.user && status == 200) {
        await signin(user)(dispatch)
    }
}

export const signOut = () => async (dispatch: Dispatch<UserActionTypes>, getState: () => AppState) => {
    const { user } = getState();
    await axios.put('api/users/admin/signout', 
        {}, {
            headers: {"Authorization": `Bearer ${user.token}`}
    });
    dispatch({
        type: SIGN_OUT
    })
}

