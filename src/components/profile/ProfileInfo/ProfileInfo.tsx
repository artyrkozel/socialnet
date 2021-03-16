import React, {useState} from "react";
import Preloader from "../../common/Preloader/Preloader";
import c from './ProfileInfo.module.css'
import userPhoto from './../../../assets/images/user.png'
import UploadButtons from "./UploadButtons";
import {ProfileType} from "../../../redux/store";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataFormRedux from "./ProfileDataForm/ProfileDataFormRedux";
import ProfileData from "./ProfileData/ProfileData";
import {ProfileReducerType} from "../../../redux/profile-reducer";


type ProfileInfoType = {
    savePhoto: (file: File) => void
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    saveProfile: (profile: ProfileReducerType) => void
}

const ProfileInfo: React.FC<ProfileInfoType> = (props) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    if (!props.profile) {
        return <Preloader/>
    }
    const toEditMode = () => {
        setEditMode(true)
    }
    const onSubmit = (formData: any) => {
        props.saveProfile(formData)
        setEditMode(false)

    }
    return (
        <div className={c.profileInfo}>
            <div className={c.descriptionBlock}>
                <div className={c.headerPhoto}>
                    <img src={props.profile.photos.large || userPhoto} className={c.userPhoto} alt="profilePhoto"/>
                    {props.isOwner && <UploadButtons savePhoto={props.savePhoto}/>}
                    <div className={c.name}>{props.profile.fullName}</div>
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                </div>
                {editMode ?
                    <ProfileDataFormRedux initialValues={props.profile} profile={props.profile} toEditMode={toEditMode}
                                          onSubmit={onSubmit}/>
                    : <ProfileData profile={props.profile} isOwner={props.isOwner} toEditMode={toEditMode}/>}
            </div>
        </div>
    )
}


export default ProfileInfo