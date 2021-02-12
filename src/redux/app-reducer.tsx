import {ActionsTypes} from "./store";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import { getAutUserData } from "./auth-reducer";


const INITIALIZED_SUCCESS= 'INITIALIZED-SUCCESS'




let initialState = {
    initialized: false
}

type InitialType = typeof initialState

const appReducer = (state: InitialType = initialState, action: ActionsTypes): InitialType => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }

}

export const initializedSuccess= () => {
    return {
        type: INITIALIZED_SUCCESS,
    }
}
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAutUserData())
    promise.then(() => {
        dispatch(initializedSuccess())
    })

}

export default appReducer