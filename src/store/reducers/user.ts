import { SIGN_IN, SIGN_OUT, UserActionTypes } from "../actions/user/types"
export interface IUser {
    _id?: string,
    name?: string,
    email: string,
    password: string
}

interface IUserInitialState {
    user: IUser,
    isSignedIn: boolean,
    token: string
}

const initialState: IUserInitialState = {
    user: {
        _id: '',
        name: "",
        email: "",
        password: ''
    },
    token: localStorage.getItem('token'),
    isSignedIn: !!localStorage.getItem('token')
}

const userReducer = (state: IUserInitialState = initialState, action: UserActionTypes ) => {
    switch (action.type) {
        case SIGN_IN:
            localStorage.setItem("token", action.payload.token);
            return {...state, 
                isSignedIn: true, 
                token: action.payload.token, 
                user: action.payload.user
            };
        case SIGN_OUT:
            localStorage.removeItem('token');
            return {...state, 
                isSignedIn: false, 
                token: ""
            };
        default: return state;
    }
}

export default userReducer;