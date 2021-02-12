import React, {useState} from "react";
import Preloader from "../../Preloader";
import c from './ProfileInfo.module.css'
import userPhoto from './../../../assets/images/user.png'
import ProfileStatus from "./ProfileStatus";
import UploadButtons from "./Artur";
import {profileType} from "../../../redux/store";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";


type ProfileInfoType = {
    savePhoto: (file : any) => void
    isOwner: boolean
    profile: profileType
    status: string
    updateStatus : (status: string) => void
}

const ProfileInfo = (props: ProfileInfoType) => {
    let [editMode, setEditMode] = useState(false)
    if (!props.profile) {
        return <Preloader/>
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
                { editMode ? <ProfileDataForm profile={props.profile}/> : <ProfileData profile={props.profile}/>}
            </div>



        </div>
    )
}

const ProfileData = (props: any) => {
    return (
        <div>
            <div className={c.lol}>
                <div>
                    <div><b>Locking for a job</b> : {props.profile.lookingForAJob ? "Yes" : "No"}</div>
                </div>
                {props.profile.lookingForAJob &&
                <div><b>Mi skills</b> : <div>{props.profile.lookingForAJobDescription}</div></div>}
                <div>
                    <div><b>About me : </b>{props.profile.aboutMe ? props.profile.aboutMe : "No data"}</div>
                </div>
                <div>
                    <div><b>lookingForAJobDescription
                        : </b>{props.profile.lookingForAJobDescription ? props.profile.lookingForAJobDescription : "No data"}
                    </div>
                </div>
            </div>
            <div className={c.contacts}>
                <div><p>Contacts :</p>{Object.keys(props.profile.contacts).map(key => {
                        return <Contact contactTitle={key} contactValue={props.profile.contacts[key]}/>
                    }
                )}</div>
            </div>

        </div>
    )
}
const ProfileDataForm = (props: any) => {
    return (
        <div>
            <div className={c.lol}>
                <div>
                    <div><b>Locking for a job</b> : {props.profile.lookingForAJob ? "Yes" : "No"}</div>
                </div>
                {props.profile.lookingForAJob &&
                <div><b>Mi skills</b> : <div>{props.profile.lookingForAJobDescription}</div></div>}
                <div>
                    <div><b>About me : </b>{props.profile.aboutMe ? props.profile.aboutMe : "No data"}</div>
                </div>
                <div>
                    <div><b>lookingForAJobDescription
                        : </b>{props.profile.lookingForAJobDescription ? props.profile.lookingForAJobDescription : "No data"}
                    </div>
                </div>
            </div>
            <div className={c.contacts}>
                <div><p>Contacts :</p>{Object.keys(props.profile.contacts).map(key => {
                        return <Contact contactTitle={key} contactValue={props.profile.contacts[key]}/>
                    }
                )}</div>
            </div>

        </div>
    )
}

// @ts-ignore
const Contact = ({contactTitle, contactValue}) => {
    return (
        <div><b>{contactTitle}</b> : {contactValue}</div>
    )
}

export default ProfileInfo