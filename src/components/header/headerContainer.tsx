import React from 'react';
import Header from "./header";
import {connect} from "react-redux";
import {logout, setAuthUserData} from "../../redux/auth-reducer";
import {AppRootStateType} from "../../redux/redux-store";

export type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logout: any
}

class HeaderContainer extends React.Component<HeaderPropsType> {
    render() {
        return <Header isAuth={this.props.isAuth}
                       login={this.props.login}
                       logout={this.props.logout}
            />
    }
}
const mapStateToProps = (state: AppRootStateType) => ({
        isAuth: state.auth.isAuth,
        login: state.auth.login
})
export default connect(mapStateToProps, {setAuthUserData, logout})(HeaderContainer);