import c from "../ProfileInfo.module.css";
import React from "react";
import TextField from "@material-ui/core/TextField";
import {Field, reduxForm} from "redux-form";
import {ProfileType} from "../../../../redux/store";
import {Button, Checkbox, Icon} from "@material-ui/core";
import {renderInput, renderCheckbox} from "../../../common/formControls/FormsControls";
import {required} from "../../../utils/validators/validator";
import { Contact } from "../ProfileInfo";
import SendIcon from "@material-ui/icons/Send";
import {makeStyles} from "@material-ui/styles";
import {connect} from "react-redux";
import {AppRootStateType} from "../../../../redux/redux-store";

type ProfileDataForm = {
    profile: ProfileType
    onSubmit: (formData: any) => void
}

const ProfileDataForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit} className={c.description}>
            <button className={c.editBtn} onClick={props.toEditMode}>Edit</button>
            <div className={c.lol}>
                <div>
                    <div><b>fullName</b> : <Field placeholder={'About me'} name={'fullName'} component={renderInput} label={'fullName'}/></div>
                </div>
                <div>
                    <div><b>Locking for a job</b> : <Field type={"checkbox"} name={'lookingForAJob'} component={renderCheckbox}/></div>
                </div>
                <div>
                    <div><b>About me : </b><Field placeholder={'About me'} name={'aboutMe'} component={renderInput} label={'About me'}/></div>
                </div>
                <div>
                    <div><b>lookingForAJobDescription
                        : </b><Field placeholder={'Description'} name={'lookingForAJobDescription'} component={renderInput} label={'Description'}/>
                    </div>
                </div>
                {/*<div className={c.contacts}>*/}
                {/*    <div><p>Contacts :</p>{Object.keys(props.profile.contacts).map(key => {*/}
                {/*            return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>*/}
                {/*        }*/}
                {/*    )}</div>*/}
                {/*</div>*/}
            </div>


        </form>
    )
}
const ProfileDataFormRedux = reduxForm({form: 'profileData'})(ProfileDataForm)

export default ProfileDataFormRedux