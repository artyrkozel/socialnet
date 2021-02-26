import React from "react";

export type PostsDataType = {
    id: number,
    messege: string,
    likesCount: number
}
export type diologsDataType = {
    id: number;
    name: string;
}
export type MesegeType = {
    id: number,
    massage: string
}
export type profilePageType = {
    postsData: Array<PostsDataType>
    newPostText: string
}
export type UserType = {
    id: number,
    photoUrl: string
    followed: boolean,
    fullName: string,
    status: string,
    location: locationType
}
export type Photos = {
    small: string,
    large: string
    }
export type User2Type = {
    name: string,
    id: number,
    photos: Photos,
    status: string,
    followed: boolean
}
export type locationType = {
    city: string,
    county: string
}
export type usersPageType = {
    users: Array<UserType>

}
export type dialogsPageType = {
    diologsData: Array<diologsDataType>
    massages: Array<MesegeType>
}
export type sidebarPageType = {

}
export type AddPostActionType = {
    type: 'ADD-POST',
    newPostText: string
}
export  type ChangeNewPostTextAction = {
    type: 'UPDATE-NEW-POST-TEXT',
    newText: string
}
export type ChangeMessageBody = {
    type: 'UPDATE-NEW-MESSAGE-BODY',
    body: string
}
export type SendMessageType = {
    type: 'SEND-MESSAGE',
    newMassageBody: string
}
export type FollowType = {
    type: 'FOLLOW',
    userID: number
}
export type UnFollowType = {
    type: 'UNFOLLOW',
    userID: number
}
export type setUsersType = {
    type: 'SET_USERS',
    users: Array<UserType>
}
export type CurrentPageType = {
    type: 'SET_CURRENT_PAGE',
    currentPage: number
}
export type setTotalCountType = {
    type: 'SET_TOTAL_COUNT',
    count: number
}
export type ToggleIsFetchingType = {
    type: 'TOGGLE_IS_FETCHING',
    isFetching: boolean
}
export type SetUserProfile = {
    type: 'SET-USER-PROFILE',
    profile: ProfileType
}
export type SetUserData = {
    type: 'SET-USER-DATA',
    payload: any,
    isAuth: boolean
}
export type FollowingInProgress = {
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching : boolean
}

export type StatusType = {
    type: 'SET-STATUS',
    status: string
}
type Initialized = {
    type: 'INITIALIZED-SUCCESS'
    initialized: boolean
}
export type SetPhoto = {
    type: 'SET-PHOTO-SUCCESS'
    photos: PhotosType
}
type SetNews = {
    type: 'SET-NEWS'
    news : any
}
export type setAuthUserDataType = {
    type: 'SET-USER-DATA'
    payload: {
        id: number | null
        email: string | null
        login: any | null
        isAuth: boolean
    }

}
export type SetFilter = {
    type: 'SET_FILTER'
    payload: { term: string}
}
export type ActionsTypes = AddPostActionType | ChangeNewPostTextAction | ChangeMessageBody |
                            SendMessageType | FollowType | UnFollowType | setUsersType |
                            CurrentPageType | setTotalCountType | ToggleIsFetchingType | SetUserProfile |
                            SetUserData | FollowingInProgress | StatusType | Initialized | SetPhoto | SetNews | setAuthUserDataType | SetFilter


export type PhotosType = {
    small: string
    large: string
}
export type contactsType = {
    github: string
    vk: string
    facebook:string
    instagram:string
    twitter: string
    website: string
    youtube:  string
    mainLink: string
}
export type ProfileType = {
    aboutMe: string
    fullName : string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: PhotosType
    userId: number
    contacts: contactsType

}
