import { Dispatch } from "react";
import { DELETE_ERROR, ErrorActionPayload, ErrorActionTypes, REQUEST_ERROR } from "./types";

export const handleThrowError = (error: ErrorActionPayload) => (dispatch:Dispatch<ErrorActionTypes>) => {
    dispatch({
        type: REQUEST_ERROR,
        paylod: error
    })
}

export const handleDeleteError = () => (dispatch:Dispatch<ErrorActionTypes>) => {
    dispatch({
        type: DELETE_ERROR
    })
}
