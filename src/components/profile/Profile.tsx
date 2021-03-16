import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileReducerType} from "../../redux/profile-reducer";


export type ProfileType = {
    profile: ProfileReducerType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileReducerType) => void
}

const Profile:React.FC<ProfileType> = React.memo((props) => {
    return (
        <>
            <ProfileInfo savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile.profile} status={props.status} updateStatus={props.updateStatus} saveProfile={props.saveProfile}/>
            {props.isOwner === false ? '' : <MyPostsContainer /> }
        </>
    );
})

export default Profile;