import React from "react";
import c from "../ProfileInfo.module.css";
import {Contact} from "../ProfileInfo";
import EditIcon from "@material-ui/icons/Edit";


type ProfileDataType = {
    profile: any
    isOwner: boolean
    toEditMode: () => void
}

const ProfileData: React.FC<ProfileDataType> = (props) => {
    return (
        <div className={c.description}>
            {props.isOwner && <div><button className={c.editBtn} onClick={props.toEditMode}><EditIcon /></button></div>}
                <div className={c.Field}><b>FullName</b> : {props.profile.fullName}</div>
                <div className={c.Field}><b>Locking for a job</b> : {props.profile.lookingForAJob ? "Yes" : "No"}</div>
                <div className={c.Field}><b>About me : </b>{props.profile.aboutMe ? props.profile.aboutMe : "No data"}</div>
                <div><b>lookingForAJobDescription : </b>{props.profile.lookingForAJobDescription ? props.profile.lookingForAJobDescription : "No data"}</div>
            <div className={c.contacts}>
                <p>Contacts :</p>{Object.keys(props.profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                }
            )}
            </div>
        </div>
    )
}

export default ProfileData