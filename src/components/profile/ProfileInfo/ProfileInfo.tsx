import React, {useState} from "react";
import Preloader from "../../Preloader";
import c from './ProfileInfo.module.css'
import userPhoto from './../../../assets/images/user.png'
import UploadButtons from "./Artur";
import {ProfileType} from "../../../redux/store";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataFormRedux from "./ProfileDataForm/ProfileDataFormRedux";
import ProfileData from "./ProfileData/ProfileData";


type ProfileInfoType = {
    savePhoto: (file : File) => void
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updateStatus : (status: string) => void
    saveProfile: (profile: any) => void
}
type ContactType = {
    contactTitle: string
    contactValue: string
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
            <div className={c.descroptionBlock}>
                <div className={c.headerPhoto}>
                    <img src={props.profile.photos.large || userPhoto} className={c.userPhoto}/>
                    {props.isOwner && <UploadButtons savePhoto={props.savePhoto}/>}
                    <div className={c.name}>{props.profile.fullName}</div>
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                </div>
                { editMode ? <ProfileDataFormRedux initialValues={props.profile} profile={props.profile} toEditMode={toEditMode} onSubmit={onSubmit}/> : <ProfileData profile={props.profile} isOwner={props.isOwner} toEditMode={toEditMode}/>}
            </div>
        </div>
    )
}

export const Contact = (props: ContactType) => {
    return (
        <div><b>{props.contactTitle}</b> : {props.contactValue}</div>
    )
}

export default ProfileInfo