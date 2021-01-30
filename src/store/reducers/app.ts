import { AppActionTypes, TOGGLE_DRAWER } from "../actions/app/types";

interface IAppState {
    toggleDrawer: boolean
}

const initialState: IAppState = {
    toggleDrawer: false
}

const appReducer = (state: IAppState = initialState, action: AppActionTypes) => {
    switch(action.type) {
        case TOGGLE_DRAWER:
        return {...state, toggleDrawer: action.payload};
        default: return state;
    }
}

export default appReducer;