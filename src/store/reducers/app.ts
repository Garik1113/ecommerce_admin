import { AppActionTypes, GET_CONFIGS, TOGGLE_DRAWER } from "../actions/app/types";

interface IAppState {
    toggleDrawer: boolean,
    config: any
}

const initialState: IAppState = {
    toggleDrawer: false,
    config: {}
}

const appReducer = (state: IAppState = initialState, action: AppActionTypes) => {
    switch(action.type) {
        case TOGGLE_DRAWER:
            return {...state, toggleDrawer: action.payload};
        case GET_CONFIGS:
            return { ...state, configs: action.payload }
        default: return state;
    }
}

export default appReducer;