import {ActionsTypes, GetPrices} from "./store";
import {ThunkType, toggleIsFetching} from "./users-reducer";
import {newsAPI} from "../api/api";

const GET_PRICES= 'GET_PRICES'

let initialState = {
    prices: []
}
export const GetPricesAC = (prices: any): GetPrices => {
    return {
        type: "GET_PRICES",
        prices
    }}
type InitialType = typeof initialState

const appReducer = (state: InitialType = initialState, action: ActionsTypes): InitialType => {

    switch (action.type) {
        case GET_PRICES:
            return {
                ...state,
                prices: action.prices
            }
        default:
            return state
    }

}

export const requestPrices = (): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        let response = await newsAPI.setValues()
        dispatch(toggleIsFetching(false))
        dispatch(GetPricesAC(response.data))
    }
}

export default appReducer