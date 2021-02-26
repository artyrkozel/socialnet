import React, {useState} from "react";
import Preloader from "../../Preloader";
import c from './ProfileInfo.module.css'
import userPhoto from './../../../assets/images/user.png'
import UploadButtons from "./Artur";
import {ProfileType} from "../../../redux/store";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataFormRedux from "./ProfileDataForm/ProfileDataForm";


type ProfileInfoType = {
    savePhoto: (file : File) => void
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatus : (status: string) => void
    saveProfile: any
}
type ContactType = {
    contactTitle: string
    contactValue: string
}


const ProfileInfo = (props: ProfileInfoType) => {
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
                { editMode ? <ProfileDataFormRedux onSubmit={onSubmit}/> : <ProfileData profile={props.profile} isOwner={props.isOwner} toEditMode={toEditMode}/>}
            </div>
        </div>
    )
}

const ProfileData = (props: any) => {
    return (
            <div className={c.description}>
                {props.isOwner && <div><button className={c.editBtn} onClick={props.toEditMode}>Edit</button></div>}
                <div className={c.name}>{props.profile.fullName}</div>
                <div>
                    <div><b>Locking for a job</b> : {props.profile.lookingForAJob ? "Yes" : "No"}</div>
                </div>
                <div><b>Mi skills</b> : <div>{props.profile.lookingForAJobDescription}</div></div>
                <div>
                    <div><b>About me : </b>{props.profile.aboutMe ? props.profile.aboutMe : "No data"}</div>
                </div>
                <div>
                    <div><b>lookingForAJobDescription
                        : </b>{props.profile.lookingForAJobDescription ? props.profile.lookingForAJobDescription : "No data"}
                    </div>
                </div>
                <div className={c.contacts}>
                    <p>Contacts :</p>{Object.keys(props.profile.contacts).map(key => {
                            return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                        }
                    )}
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