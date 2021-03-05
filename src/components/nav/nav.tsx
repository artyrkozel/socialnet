import React from "react";
import c from './nav.module.css'
import {NavLink} from "react-router-dom";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';
import PeopleIcon from '@material-ui/icons/People';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import AnnouncementIcon from '@material-ui/icons/Announcement';

const Nav = () => {
    return (
        <nav className={c.nav}>
            <ul className={c.list}>
                <li className={c.item}><NavLink to="/profile" activeClassName={c.activeLink}><AccountBoxIcon/>Profile</NavLink></li>
                <li className={c.item}><NavLink to="/diologs" activeClassName={c.activeLink}><EmailIcon/>Messages</NavLink></li>
                <li className={c.item}><NavLink to="/users" activeClassName={c.activeLink}><PeopleIcon/>Users</NavLink></li>
                <li className={c.item}><NavLink to="/news" activeClassName={c.activeLink}><AnnouncementIcon/>News</NavLink></li>
                <li className={c.item}><NavLink to="/music" activeClassName={c.activeLink}><PlayCircleFilledIcon/>Music</NavLink></li>
                <li className={c.item}><NavLink to="/chat" activeClassName={c.activeLink}><PlayCircleFilledIcon/>Chat</NavLink></li>
            </ul>
        </nav>

    );
}

export default Nav;