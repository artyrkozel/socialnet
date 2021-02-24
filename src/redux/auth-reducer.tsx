import {ActionsTypes, setAuthUserDataType} from "./store";
import {authAPI, ResultCodes} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkType} from "./users-reducer";


const SET_USERS_DATA = 'SET-USER-DATA'

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

type InitialType = typeof initialState
const authReducer = (state: InitialType = initialState, action: ActionsTypes): InitialType => {

    switch (action.type) {
        case SET_USERS_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }

}

export const setAuthUserData = (id: any, email: any, login: any, isAuth: boolean): setAuthUserDataType => {
    return {
        type: SET_USERS_DATA,
        payload: {
            id, email, login, isAuth
        }
    }
}
export const getAutUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me();
    if (meData.resultCode === ResultCodes.Success) {
        let {id, email, login} = meData.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean = false): ThunkType => async (dispatch: any) => {
    let loginData = await authAPI.login(email, password, rememberMe = false)
    if (loginData.resultCode === ResultCodes.Success) {
        dispatch(getAutUserData())
    } else {
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}
export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === ResultCodes.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}


export default authReducer