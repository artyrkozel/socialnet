import React from "react";
import c from './Post.module.css'
import Preloader from "../../../Preloader";
import {profileType} from "../../../../redux/store";

type MesegeType = {
    messege: string
    likesCount: number
    profile: profileType
}

const Post: React.FC<MesegeType> = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={c.item}>
                <div className={c.dataUser}>
                    <img src={props.profile.photos.small} alt=""/>
                    <span>{props.profile.fullName}</span>
                </div>
                <div className={c.postBody}>
                    <div>
                        {props.messege}
                    </div>
                    <div>
                        {props.likesCount}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Post;