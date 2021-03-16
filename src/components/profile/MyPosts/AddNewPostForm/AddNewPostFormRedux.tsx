import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../common/formControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validator";
import {Button, Icon} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

type PostDataType = {
    newPostText: string
}
type PostPropsType = {}
const maxLength = maxLengthCreator(160)

const AddNewPostForm: React.FC<InjectedFormProps<PostDataType, PostPropsType> & PostPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder='post message'
                   name={'newPostText'}
                   component={Textarea}
                   validate={[required,maxLength]}

            />
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
const AddNewPostFormRedux = reduxForm<PostDataType, PostPropsType>({
    form: 'ProfileAddNewPostForm'
})(AddNewPostForm)

export default AddNewPostFormRedux