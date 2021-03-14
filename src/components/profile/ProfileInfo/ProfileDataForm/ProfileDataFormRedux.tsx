import c from "../ProfileInfo.module.css";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {renderInput, renderCheckbox} from "../../../common/formControls/FormsControls";
import SaveIcon from '@material-ui/icons/Save';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type ProfileDataFormReduxProps = {
    profile: any
    onSubmit: (formData: any) => void
    toEditMode: () => void
}
type ProfileDataFormValues = {
    fullName: string
    lookingForAJob: boolean
    aboutMe: string
    lookingForAJobDescription: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiInputBase-input': {
                padding: '0px'
            },
        },
    }),
);



const ProfileDataForm: React.FC<InjectedFormProps<ProfileDataFormValues, ProfileDataFormReduxProps> & ProfileDataFormReduxProps> = (props) => {
    const classes = useStyles();
    return (
        <form onSubmit={props.handleSubmit} className={c.description}>
            <button className={c.editBtn} onClick={props.toEditMode}><SaveIcon/></button>
            <div className={c.Field}><b>FullName</b> : <Field className={classes.root} placeholder={'About me'} name={'fullName'} component={renderInput} label={'fullName'}/></div>
            <div className={c.Field}><b>Locking for a job</b> : <Field type={"checkbox"} name={'lookingForAJob'} component={renderCheckbox}/></div>
            <div className={c.Field}><b>About Me</b> : <Field placeholder={'About me'} name={'aboutMe'} component={renderInput} label={'About me'}/></div>
            <div className={c.Field}><b>lookingForAJobDescription : </b><Field placeholder={'Description'} name={'lookingForAJobDescription'} component={renderInput} label={'Description'}/></div>
            <div className={c.contacts}>
                <div><p>Contacts :</p>{Object.keys(props.profile.contacts).map(key => {
                        return <div className={c.contacts}>
                            <b>{key} : <Field placeholder={key} name={'contacts.' + key} component={renderInput} label={'Description'}/></b></div>
                    }
                )}</div>
            </div>
        </form>
    )
}
const ProfileDataFormRedux = reduxForm<ProfileDataFormValues, ProfileDataFormReduxProps>({form: 'profileData'})(ProfileDataForm)

export default ProfileDataFormRedux