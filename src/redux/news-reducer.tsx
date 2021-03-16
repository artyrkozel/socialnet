import {ActionsTypes, SetNews} from "./store";
import {NewsItem} from "../components/news/News";
import {newsAPI} from "../api/api";
import { ThunkType, toggleIsFetching} from "./users-reducer";
const SET_NEWS= 'SET-NEWS'

let initialState = {
    news : [] as NewsItem[]
}

export const SetNewsAC = (news: any): SetNews => {
    return {
        type: "SET-NEWS",
        news
    }}

    export type InitialType = typeof initialState

const newsReducer = (state: InitialType = initialState, action: ActionsTypes): InitialType => {
    switch (action.type) {
        case SET_NEWS:
            return {
                ...state,
                news: action.news,
            }
        default:
            return state
    }

}
export const requestNews = (): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        let response = await newsAPI.setNews()
        dispatch(toggleIsFetching(false))
        dispatch(SetNewsAC(response.data.articles))
    }
}

export default newsReducer