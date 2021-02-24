import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    setUserProfile,
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {ProfileType} from "../../redux/store";

import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppRootStateType} from "../../redux/redux-store";

export type PostsDataType = {
    setUserProfile: (profile: ProfileType) => void
    profile: ProfileType
    getUserProfile: (userID: number) => void
    isAuth: boolean,
    getStatus: (userID: number) => void
    status: string
    updateStatus: (status: string) => void
    authUserID: number
    savePhoto: (file: File) => void
    avatar: File
}

class ProfileContainer extends React.Component<PostsDataType & RouteComponentProps<{ userId: string }>> {
    refreshProfile() {
        let userId = Number(this.props.match.params.userId)
        if (!userId) {
            userId = this.props.authUserID
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PostsDataType & RouteComponentProps<{ userId: string }>>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return <Profile
            profile={this.props.profile}
            status={this.props.status}
            updateStatus={this.props.updateStatus}
            isOwner={!this.props.match.params.userId}
            savePhoto={this.props.savePhoto}
        />

    }
}

let mapStateToProps = (state: AppRootStateType) => ({
    profile: state.profile,
    status: state.profile.status,
    authUserID: state.auth.id,
    isAuth: state.auth.isAuth,
})

export default compose(withAuthRedirect, withRouter,
    connect(mapStateToProps, {setUserProfile, getUserProfile, getStatus, updateStatus, savePhoto})
)(ProfileContainer)