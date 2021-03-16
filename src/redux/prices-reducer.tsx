import {ActionsTypes, GetPrices, FilterToUp} from "./store";
import {ThunkType, toggleIsFetching} from "./users-reducer";
import {newsAPI} from "../api/api";

const GET_PRICES= 'GET_PRICES'
const FILTER_TO_UP = 'FILTER_TO_UP'

export type PricesType = {
    ath: number
    ath_change_percentage: number
    ath_date: string
    atl: number
    atl_change_percentage: number
    atl_date: string
    circulating_supply: number
    current_price: number
    fully_diluted_valuation: number
    high_24h: number
    id: string
    image: string
    last_updated: string
    low_24h: number
    market_cap: number
    market_cap_change_24h: number
    market_cap_change_percentage_24h: number
    market_cap_rank: number
    max_supply: number
    name: string
    price_change_24h: number
    price_change_percentage_24h: number
    roi: null
    sparkline_in_7d: any
    symbol: string
    total_supply: number
    total_volume: number
}

let initialState = {
    prices: [] as Array<PricesType>
}
export const GetPricesAC = (prices: Array<PricesType>): GetPrices => {
    return {
        type: GET_PRICES,
        prices
    }
}
export const FilterToUpAC = (prices: Array<PricesType>): FilterToUp => {
    return {
        type: FILTER_TO_UP,
        prices
    }
}

type InitialType = typeof initialState

const appReducer = (state: InitialType = initialState, action: ActionsTypes): InitialType => {

    switch (action.type) {
        case GET_PRICES:
            return {
                ...state,
                prices: action.prices
            }
        case "FILTER_TO_UP":
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