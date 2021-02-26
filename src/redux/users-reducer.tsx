import {
    ActionsTypes,
    FollowType,
    UnFollowType, setUsersType, UserType, CurrentPageType, setTotalCountType, ToggleIsFetchingType, FollowingInProgress, SetFilter
} from "./store";
import {usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "./redux-store";


const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'
const SET_FILTER = 'SET_FILTER'
export const follow= (userID: number): FollowType => {
    return {
        type: FOLLOW,
        userID
    }
}
export const unfollow = (userID: number): UnFollowType => {
    return {
        type: UNFOLLOW,
        userID
    }
}
export const setUsers = (users: any): setUsersType => {
    return {
        type: SET_USERS,
        users
    }
}
export const setCurrentPage = (currentPage: number): CurrentPageType => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: currentPage
    }
}
export const setFilter = (term: string): SetFilter => {
    return {
        type: SET_FILTER,
        payload: {term}
    }
}
export const setTotalUsersCount = (totalUsersCount: number): setTotalCountType => {
    return {
        type: SET_TOTAL_COUNT,
        count: totalUsersCount
    }
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }

}
export const toggleFollowingInProgress = (isFetching: boolean): FollowingInProgress => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching
    }
}


let initialState = {
    users: [] as UserType[],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress : false,
    filter: {term: ''}
}

type InitialType = typeof initialState
export type FilterType = typeof initialState.filter
const usersReducer = (state: InitialType = initialState, action: ActionsTypes): InitialType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    } else {
                        return  u
                    }
                })
            }
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.count}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {...state, followingInProgress: action.isFetching}
        case SET_FILTER:
            return {...state, filter: action.payload}
        default:
            return state
    }

}

export type ThunkType = ThunkAction<Promise<void>, AppRootStateType, any, ActionsTypes>

export const requiredUsers = (page: number, pageSize: number, term: string): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))
        dispatch(setFilter(term))
        let data = await usersAPI.getUsers(page, pageSize, term)
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
    }
}

export const followThunk = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleFollowingInProgress(true))
        let followData = await usersAPI.follow(userId)
                if(followData.resultCode === 0 ){
                   dispatch(follow(userId))
                }
                dispatch(toggleFollowingInProgress(false))
    }
}
export const unfollowThunk = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleFollowingInProgress(true))
        let unfollowData = await usersAPI.unfollow(userId)
                if(unfollowData.resultCode === 0 ){
                    dispatch(unfollow(userId))}
                dispatch(toggleFollowingInProgress(false))
    }
}


export default usersReducer