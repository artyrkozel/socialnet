import {
    ActionsTypes,
    FollowType,
    usersPageType,
    UnFollowType, setUsersType, UserType, User2Type
} from "./store";
import {usersAPI} from "../api/api";


const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

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
export const setCurrentPage = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: currentPage
    }
}
export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: SET_TOTAL_COUNT,
        count: totalUsersCount
    }
}
export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }

}
export const toggleFollowingInProgress = (isFetching: boolean) => {
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
    followingInProgress : false
}

type InitialType = typeof initialState

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
        default:
            return state
    }

}

export const requiredUsers = (page: any, pageSize: any) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))
        let data = await usersAPI.getUsers(page, pageSize)
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
    }
}

export const followThunk = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(toggleFollowingInProgress(true))
        let response = await usersAPI.follow(userId)
                if(response.data.resultCode === 0 ){
                   dispatch(follow(userId))
                }
                dispatch(toggleFollowingInProgress(false))
    }
}
export const unfollowThunk = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(toggleFollowingInProgress(true))
        let response = await usersAPI.unfollow(userId)
                if(response.data.resultCode === 0 ){
                    dispatch(unfollow(userId))}
                dispatch(toggleFollowingInProgress(false))
    }
}


export default usersReducer