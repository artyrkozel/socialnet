import React from "react";
import c from './Post.module.css'
import Preloader from "../../../Preloader";
import {ProfileType} from "../../../../redux/store";

type MesegeType = {
    message: string
    likesCount: number
    profile: ProfileType
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
                        {props.message}
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