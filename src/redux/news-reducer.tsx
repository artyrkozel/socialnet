import {ActionsTypes} from "./store";
import {NewsItem} from "../components/news/News";

const SET_NEWS= 'SET-NEWS'

let initialState = {
    news : [] as Array<NewsItem> | []
}

export const SetNewsAC = (news: any) => {
    return {
        type: "SET-NEWS",
        news
    }}

    type InitialType = typeof initialState

const newsReducer = (state: InitialType = initialState, action: ActionsTypes): InitialType => {
    switch (action.type) {
        case SET_NEWS:
            debugger
            return {
                ...state,
                news: action.news,
            }
        default:
            return state
    }

}


export default newsReducer