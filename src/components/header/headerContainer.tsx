import React from 'react';
import Header from "./header";
import {connect} from "react-redux";
import {logout, setAuthUserData} from "../../redux/auth-reducer";


type headerType = {
    setAuthUserData : () => void
}

class HeaderContainer extends React.Component<any> {

    render() {
        return <Header isAuth={this.props.isAuth}
                       login={this.props.login}
                       logout={this.props.logout}
            />
    }
}
const mapStateToProps = (state: any) => ({
        isAuth: state.auth.isAuth,
        login: state.auth.login
})
export default connect(mapStateToProps, {setAuthUserData, logout})(HeaderContainer);