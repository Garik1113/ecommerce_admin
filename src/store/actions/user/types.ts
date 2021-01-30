export const SIGN_IN = "SIGN_IN";
export const SIGN_UP = "SIGN_UP";
export const SIGN_OUT = "SIGN_OUT";

type SigninActionType = {
     type: typeof SIGN_IN,
     payload: any
}

type SignupActionType = {
     type: typeof SIGN_UP,
     payload: any
}

type SignOutActionType = {
     type: typeof SIGN_OUT
}

export type UserActionTypes = 
     |    SigninActionType 
     |    SignupActionType
     |    SignOutActionType

