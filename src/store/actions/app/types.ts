export const TOGGLE_DRAWER = "TOGGLE_DRAWER";
export const GET_CONFIGS = 'GET_CONFIGS'

type ToggleDrawerActionType = {
    type: typeof TOGGLE_DRAWER,
    payload: boolean
}

type GetConfigs = {
    type: typeof GET_CONFIGS,
    payload: any
}

export type AppActionTypes =
    |   ToggleDrawerActionType
    |   GetConfigs