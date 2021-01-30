export const TOGGLE_DRAWER = "TOGGLE_DRAWER";

type ToggleDrawerActionType = {
    type: typeof TOGGLE_DRAWER,
    payload: boolean
}

export type AppActionTypes =
        |   ToggleDrawerActionType