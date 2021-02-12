import React from "react";
import {sendMessageCreator} from "../../redux/dialogs-reducer";
import {AppRootStateType} from "../../redux/redux-store";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


let mapStateToProps = (state: AppRootStateType) => {
    return {
        dialogs: state.dialogs,
        isAuth: state.auth.isAuth

    }
}
let mapDispatchToProps = (dispatch: any) => {
    return {
        sendMessage: (newMassageBody: string) => {
            dispatch(sendMessageCreator(newMassageBody))
        }
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps),
)(Dialogs)