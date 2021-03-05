import React from "react";
import c from './MyPosts.module.css'
import Post from './Post/Post'
import { reduxForm, Field }  from "redux-form";
import { required, maxLengthCreator } from "../../utils/validators/validator";
import {Textarea} from "../../common/formControls/FormsControls";
import {Button, Icon} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

type NewType = {
    postsData : Array<PostsDataType>
    addPost: (values: string) => void
    // newPostText: string
    profile : any
}
export type PostsDataType = {
    id: number,
    message: string,
    likesCount: number
}

const maxLength = maxLengthCreator(160)

const MyPosts: React.FC<NewType> = (props) => {
    let postsElement = props.postsData
        .map((p,key) => <Post key={key} message={p.message} likesCount={p.likesCount} profile={props.profile}/>)

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

const AddNewPostForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='post message'
                       name={'newPostText'}
                       component={Textarea}
                       validate={[required,maxLength]}

                />
            </div>
            <Button
                style={{marginTop: '15px'}}
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<Icon><SendIcon/></Icon>}
            >
                Send
            </Button>
        </form>
    )
}
const AddNewPostFormRedux = reduxForm({
    form: 'ProfileAddNewPostForm'
})(AddNewPostForm)
export default MyPosts;