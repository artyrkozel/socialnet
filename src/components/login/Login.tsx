import React from 'react';
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from 'react-router-dom';
import {AppRootStateType} from "../../redux/redux-store";
import LoginReduxForm from "./loginFormRedux/LoginFormRedux";

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
type MapStateToPropsType = {
    isAuth: boolean
}
type LoginPropsType = {
    isAuth: boolean,
    login: (email: string, password: string, rememberMe: boolean) => void
}

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: LoginFormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return <LoginReduxForm onSubmit={onSubmit}/>
}
const MapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(MapStateToProps, {login})(Login)