import React from "react";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

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

export type AppstateType = {
    profilePage: profilePageType,
    dialogsPage: dialogsPageType,
    sidebar : sidebarPageType

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
export type StoreType = {
    _state: AppstateType,
    _callSubscriber: (state:AppstateType) => void,
    subscribe: any
    getState: () => AppstateType
    dispatch: (action: ActionsTypes) => void
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
    profile: profileType
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
    photos: photosType
}
type SetNews = {
    type: 'SET-NEWS'
    news : any
}

export type ActionsTypes = AddPostActionType | ChangeNewPostTextAction | ChangeMessageBody |
                            SendMessageType | FollowType | UnFollowType | setUsersType |
                            CurrentPageType | setTotalCountType | ToggleIsFetchingType | SetUserProfile |
                            SetUserData | FollowingInProgress | StatusType | Initialized | SetPhoto | SetNews


export type photosType = {
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
export type profileType = {
    aboutMe: string
    fullName : string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: photosType
    userId: number
    contacts: contactsType

}


// let store:StoreType = {
//     _state: {
//         profilePage: {
//             postsData: [
//                 {id: 1, messege: "Hi, how are you", likesCount: 12},
//                 {id: 2, messege: "Hello, what is you name", likesCount: 10},
//             ],
//             newPostText: ''
//         },
//         dialogsPage: {
//             massages: [
//                 {id: 1, massage: "First massage"},
//                 {id: 2, massage: "Second massage"},
//                 {id: 3, massage: "Next massage"},
//                 {id: 4, massage: "Last massage"},
//             ],
//             diologsData: [
//                 {id: 1, name: "Artur"},
//                 {id: 2, name: "Valera"},
//                 {id: 3, name: "Ignat"},
//                 {id: 4, name: "Vova"},
//             ],
//
//         },
//         sidebar: {
//
//         }
//
//
//     },
//     _callSubscriber() {
//         console.log('State is changed')
//     },
//     subscribe(observer: () => void) {
//         this._callSubscriber = observer
//     },
//     getState(){
//         return this._state
//     },
//
//     dispatch(action) {
//         // this._state.profilePage = profileReducer(this._state.profilePage, action)
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
//         this._state.sidebar = sidebarReducer(this._state.sidebar, action)
//
//         this._callSubscriber(this._state)
//     }
// }




// export default store