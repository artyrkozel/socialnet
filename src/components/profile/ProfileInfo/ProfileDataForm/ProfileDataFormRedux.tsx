import c from "../ProfileInfo.module.css";
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {renderInput, renderCheckboxBlack} from "../../../common/formControls/FormsControls";
import SaveIcon from '@material-ui/icons/Save';
import {makeStyles} from '@material-ui/core/styles';

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

const useStyles = makeStyles({
        MuiInputInput: {
            '& .MuiInputBase-input': {
                padding: '0px'
            },
        },

}
)

const ProfileDataForm: React.FC<InjectedFormProps<ProfileDataFormValues, ProfileDataFormReduxProps> & ProfileDataFormReduxProps> = (props) => {
    const classes = useStyles();
    return (
        <form onSubmit={props.handleSubmit} className={c.description}>
            <button className={c.editBtn} onClick={props.toEditMode}><SaveIcon/></button>
            <div className={c.Field}><b>FullName :</b> <Field className={classes.MuiInputInput} placeholder={'About me'} name={'fullName'} component={renderInput} label={'fullName'}/></div>
            <div className={c.Field}><b>Locking for a job :</b> <Field className={classes.MuiInputInput} type={"checkbox"} name={'lookingForAJob'} component={renderCheckboxBlack}/></div>
            <div className={c.Field}><b>About me :</b><Field className={classes.MuiInputInput} placeholder={'About me'} name={'aboutMe'} component={renderInput} label={'About me'}/></div>
            <div className={c.Field}><b>lookingForAJobDescription : </b><Field className={classes.MuiInputInput} placeholder={'Description'} name={'lookingForAJobDescription'} component={renderInput} label={'Description'}/></div>
            <div className={c.contacts}>
                <div><p>Contacts :</p>{Object.keys(props.profile.contacts).map(key => {
                        return <div className={c.contacts} key={key}>
                            <b>{key} : <Field className={classes.MuiInputInput} placeholder={key} name={'contacts.' + key} component={renderInput} label={'Description'}/></b></div>
                    }
                )}</div>
            </div>
        </form>
    )
}
const ProfileDataFormRedux = reduxForm<ProfileDataFormValues, ProfileDataFormReduxProps>({form: 'profileData'})(ProfileDataForm)

export default ProfileDataFormRedux