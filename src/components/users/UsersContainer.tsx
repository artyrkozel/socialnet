import React from "react";
import {connect} from "react-redux";
import {follow, setCurrentPage, unfollow,
        toggleIsFetching, toggleFollowingInProgress,
        requiredUsers, followThunk, unfollowThunk
} from "../../redux/users-reducer";
import {User2Type} from "../../redux/store";
import Users from "./Users";
import Preloader from "../Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {getPageSize, getUsers, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress} from "../../redux/users-selectors";
import {AppRootStateType} from "../../redux/redux-store";
type UsersType = {
    users: Array<User2Type>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    toggleIsFetching: (isFetching: boolean) => void
    followingInProgress: (followingInProgress : boolean) => void
    toggleFollowingInProgress: (isFetching: boolean) => void,
    getUsers: (currentPage: number, pageSize: number) => void
    unfollowThunk: (userId: number) => void
    followThunk: (userId: number) => void
}


class UsersContainer extends React.Component<UsersType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }
    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                     pageSize={this.props.pageSize}
                     currentPage={this.props.currentPage}
                     onPageChanged={this.onPageChanged}
                     users={this.props.users}
                     follow={this.props.follow}
                     unfollow={this.props.unfollow}
                       toggleFollowingInProgress={this.props.toggleFollowingInProgress}
                       followingInProgress={this.props.followingInProgress}
                       unfollowThunk={this.props.unfollowThunk}
                       followThunk={this.props.followThunk}
                />
                </>
        )
    }
}

let mapStateToProps = (state: AppRootStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {follow, unfollow,
        setCurrentPage, toggleIsFetching,
        toggleFollowingInProgress, getUsers: requiredUsers, followThunk, unfollowThunk},
        ))(UsersContainer)

