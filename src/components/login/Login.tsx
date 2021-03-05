import React from 'react';
import {reduxForm, Field, InjectedArrayProps, InjectedFormProps} from "redux-form";
import {renderInput, renderCheckbox} from '../common/formControls/FormsControls';
import {maxLengthCreator, required} from "../utils/validators/validator";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import {Button, Icon} from "@material-ui/core";
import loginImage from './../../assets/images/img-01.png'
import s from './login.module.css'
import {makeStyles} from "@material-ui/styles";
import {AppRootStateType} from "../../redux/redux-store";


type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
type MapStateToPropsType = {
    isAuth: boolean
}
type LoginFormPropsType = {

}



const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
});
const maxLength = maxLengthCreator(20)



const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormPropsType> & LoginFormPropsType> = (props) => {
    const classes = useStyles();
    return (
        <div className={s.loginContainer}>
            <div>
                <img src={loginImage} alt=""/>
            </div>
            <div className={s.loginForm}>
                <h1>Member Login</h1>
                <form onSubmit={props.handleSubmit}>
                    <div>
                        <Field placeholder={'login'} name={'email'} component={renderInput} validate={[required, maxLength]}
                               label={'Email'}/>
                    </div>
                    <div>
                        <Field placeholder='password' name={'password'} type={"password"} component={renderInput}
                               validate={[required, maxLength]} label={'Password'}/>
                    </div>
                    <div>
                        <Field type={"checkbox"} name={'rememberMe'} component={renderCheckbox} label={"Remember me"}/>
                    </div>
                    {props.error && <div className={s.formSummeryError}>{props.error}
                    </div>}
                    <Button
                        className={classes.root}
                        type="submit"
                        variant="contained"
                        color="primary"
                        endIcon={<Icon><SendIcon/></Icon>}
                    >
                        Send
                    </Button>
                </form>
            </div>
        </div>
    )
}

const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormPropsType>({
    form: 'login'
})(LoginForm)



const Login = (props: any) => {
    const onSubmit = (formData: LoginFormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}
const MapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(MapStateToProps, {login})(Login)