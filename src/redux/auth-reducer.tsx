import {ActionsTypes} from "./store";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";


const SET_USERS_DATA = 'SET-USER-DATA'
const UNFOLLOW = 'UNFOLLOW'



let initialState = {
    id : null,
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

export const setAuthUserData= (id: any, email: any, login: any, isAuth: boolean) => {
    return {
        type: SET_USERS_DATA,
        payload: {
            id, email, login, isAuth
        }
    }
}
export const getAutUserData = () => async (dispatch: any) => {
    let response = await authAPI.me();
        if(response.data.resultCode === 0) {
            let {id, email, login} = response.data.data
            dispatch(setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean = false) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe = false)
        if(response.data.resultCode === 0) {
            dispatch(getAutUserData())
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
            dispatch(stopSubmit("login", {_error: message}))
        }
}
export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout()
        if(response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
}


export default authReducer