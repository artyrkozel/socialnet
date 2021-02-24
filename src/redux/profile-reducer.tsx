import {ActionsTypes, AddPostActionType, PhotosType, ProfileType, SetPhoto, SetUserProfile, StatusType} from "./store";
import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const SET_PHOTO_SUCCESS = 'SET-PHOTO-SUCCESS'


export const addPostActionCreator = (newPostText: string):AddPostActionType  => {
    return {
        type: ADD_POST,
        newPostText
    }
}
export const setUserProfile = (profile: ProfileType): SetUserProfile => {
    return {
        type: 'SET-USER-PROFILE',
        profile
    }
}
export const setStatus = (status: string): StatusType => {
    return {
        type: 'SET-STATUS',
        status
    }
}
export const setPhotoSuccess = (photos: PhotosType): SetPhoto => {
    return {
        type: SET_PHOTO_SUCCESS,
        photos
    }
}
export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let profileData = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(profileData))
}
export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
        if(response.data.resultCode === 0 ){
        dispatch(setStatus(status))
    }
}
export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file)
        if(response.data.resultCode === 0 ){
        dispatch(setPhotoSuccess(response.data.data.photos as PhotosType))
    }
}

let initialState = {
    postsData: [
        {id: 1, message: "Hi, how are you", likesCount: 12},
        {id: 2, message: "Hello, what is you name", likesCount: 10},
    ],
    profile: null as ProfileType | null,
    status: '',
}

export type ProfileReducerType = typeof initialState

const profileReducer = ( state: ProfileReducerType = initialState, action: ActionsTypes): ProfileReducerType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: state.profile ? {...state.profile, photos: action.photos} : null
            }
        }
        default:
            return state
    }
}
export default profileReducer