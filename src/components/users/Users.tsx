import React from "react";
import s from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {User2Type} from "../../redux/store";
import {NavLink} from "react-router-dom";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Pagination from "@material-ui/lab/Pagination";
import UsersSearchForm from "./UsersSearchForm";
import {FilterType} from "../../redux/users-reducer";


type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<User2Type>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    toggleFollowingInProgress: (isFetching: boolean) => void
    followingInProgress: any
    unfollowThunk: (userId: number) => void
    followThunk: (userId: number) => void
    onFilterChanged: (filter: FilterType) => void
}
const useStyles = makeStyles({
    btn: {
        background: 'linear-gradient(to right, #36D1DC 0%, #5B86E5  51%, #36D1DC  100%)',
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


const Users = (props: PropsType) => {
    const classes = useStyles();
    const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        props.onPageChanged(page)
    }
    return <div>
        {/*<Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>*/}

        <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
        <Pagination page={props.currentPage} count={props.totalUsersCount} variant="outlined" shape="rounded" onChange={onChangePage}/>
            {
                props.users.map(u =>
                    <div key={u.id} className={s.userBlock}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto}/>
                            </NavLink>
                        </div>
                        <div className={s.userClass}>
                            {u.followed
                                ? <Button className={classes.btn} disabled={props.followingInProgress}
                                          onClick={() => {
                                              props.unfollowThunk(u.id)
                                          }}>UnFollow</Button > :
                                <Button className={classes.btn} variant="contained" disabled={props.followingInProgress}
                                        onClick={() => {
                                            props.followThunk(u.id)
                                        }}>Follow</Button >}
                        </div>
                    </span>
                        <span>
                            <div className={classes.name}>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                </div>)
            }
    </div>
}




export default Users