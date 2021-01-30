export const REQUEST_ERROR = 'REQUEST_ERROR';
export const DELETE_ERROR = 'DELETE_ERROR'
export interface ErrorActionPayload {
    status: string,
    statusCode: number,
    message: string
}

type RequestErrorActionType = {
    type: typeof REQUEST_ERROR,
    paylod: ErrorActionPayload
}

type DeleteErrorActionType = {
    type: typeof DELETE_ERROR
}

export type ErrorActionTypes = 
    | RequestErrorActionType
    | DeleteErrorActionType