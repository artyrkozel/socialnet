import React from "react";
import c from './MyPosts.module.css'
import Post from './Post/Post'
import Preloader from "../../common/Preloader/Preloader";
import AddNewPostFormRedux from "./AddNewPostForm/AddNewPostFormRedux";

type NewType = {
    postsData : Array<PostsDataType>
    addPost: (values: string) => void
    profile : any
}
export type PostsDataType = {
    id: string,
    message: string,
    likesCount: number
}

const MyPosts: React.FC<NewType> = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    let postsElement = props.postsData
        .map((p) => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount} profile={props.profile}/>)

    let OnAddPost = (values: any) => {
            props.addPost(values.newPostText);
    }
    return (
        <div className={c.postsBlock}>
            <div>
                <AddNewPostFormRedux onSubmit={OnAddPost}/>
            </div>
            <div className={c.posts}>
                {postsElement}
            </div>
        </div>

    );
}

export default MyPosts;