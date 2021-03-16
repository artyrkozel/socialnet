import React, {useEffect} from "react";
import s from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink, Redirect} from "react-router-dom";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Pagination from "@material-ui/lab/Pagination";
import UsersSearchForm from "./UsersSearchForm";
import {FilterType, requestUsers, followThunk, unfollowThunk} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress, getIsAuth, getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import Preloader from "../common/Preloader/Preloader";

const useStyles = makeStyles({
    btn: {
        background: 'linear-gradient( 112.7deg,  rgba(253,185,83,1) 11.4%, rgba(255,138,0,1) 70.2% );',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 35,
        padding: '0 20',
    },
    name: {
        fontSize: '19px',
    }
});

export const Users = () => {

    const classes = useStyles();
    const isFetching = useSelector(getIsFetching)
    const isAuth = useSelector(getIsAuth)
    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, ''))
    }, [dispatch,currentPage, pageSize])

    const follow = (userID: number) => {
        dispatch(followThunk(userID))
    }
    const unfollow = (userID: number) => {
        dispatch(unfollowThunk(userID))
    }
    const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(requestUsers(page, pageSize, filter.term))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter.term))
    }
    if(isAuth === false) return <Redirect to={'login'}/>
    return <>
        {isFetching ? <Preloader/> : null}
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <Pagination page={currentPage} count={totalUsersCount} variant="outlined" shape="rounded"
                    onChange={onChangePage}/>
        {
            users.map(u =>
                <div key={u.id} className={s.userBlock}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto} alt={''}/>
                            </NavLink>
                        </div>
                        <div className={s.userClass}>
                            {u.followed
                                ? <Button className={classes.btn} disabled={followingInProgress}
                                          onClick={() => {
                                              unfollow(u.id)
                                          }}>UnFollow</Button> :
                                <Button className={classes.btn} variant="contained" disabled={followingInProgress}
                                        onClick={() => {
                                            follow(u.id)
                                        }}>Follow</Button>}
                        </div>
                    </span>
                    <div>
                        <div className={classes.name}>{u.name}</div>
                    </div>
                </div>)
        }
    </>
}



