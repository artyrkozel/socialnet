import React from "react";
import c from './Post.module.css'
import {ProfileType} from "../../../../redux/store";
import {Avatar, Button} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch} from "react-redux";
import {deletePostActionCreator} from "../../../../redux/profile-reducer";
type MesegeType = {
    id: string
    message: string
    likesCount: number
    profile: ProfileType
}

const Post: React.FC<MesegeType> = (props) => {

    const dispatch = useDispatch()
    const deleteMessage = () => {
        dispatch(deletePostActionCreator(props.id))
    }
    return (
        <div>
            <div className={c.item}>
                <div className={c.dataUser}>
                    <Avatar alt="Remy Sharp" src={props.profile.photos.small} />
                </div>
                <div className={c.dataWrapper}>
                    <div className={c.topInfo}>
                        {props.profile.fullName}
                        <Button onClick={deleteMessage}><DeleteIcon style={{width:'20px', height: '20px'}}/></Button>
                    </div>
                    <div className={c.bottomInfo}>
                        {props.message}
                        <div>
                            {props.likesCount}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;