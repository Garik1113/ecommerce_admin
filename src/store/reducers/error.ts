import { DELETE_ERROR, ErrorActionPayload, ErrorActionTypes, REQUEST_ERROR } from "../actions/error/types";

interface IErrorInitialState {
    error?: ErrorActionPayload,
    haseError: boolean
}

const initialState: IErrorInitialState = {
    error: {
        status: "",
        statusCode: 0,
        message: ""
    },
    haseError: false
}

const errorReducer = (state: IErrorInitialState = initialState, action: ErrorActionTypes) => {
    switch(action.type) {
        case REQUEST_ERROR:
            return {...state, error: action.paylod, haseError: true};
        case DELETE_ERROR:
            return {...state, error: {}, haseError: false}
        default: return state;
    }
}

export default errorReducer;
