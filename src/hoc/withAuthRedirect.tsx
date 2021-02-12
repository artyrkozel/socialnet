import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

 export const withAuthRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<any> {
        render() {
            if(this.props.isAuth === false) return <Redirect to={'login'}/>
            return <Component {...this.props}/>
        }

    }
     let mapStateToPropsForRedirect = (state: any) => ({
         isAuth: state.auth.isAuth
     })
     let ConnectedAuthRedirectComponent =  connect(mapStateToPropsForRedirect)(RedirectComponent);
     return ConnectedAuthRedirectComponent
}
