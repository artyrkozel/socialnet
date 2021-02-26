import React from 'react';
import c from './header.module.css'
import {NavLink} from "react-router-dom";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import logo from './../../assets/images/logog.png'
import { HeaderPropsType } from './headerContainer';

const Header = (props: HeaderPropsType) => {
    return (
        <header className={c.header}>
            <NavLink to="/profile"><img src={logo} alt={'logo'}/></NavLink>
            <div className={c.loginBlock}>
                {props.isAuth ?
                    <div>{props.login}  - <Button  onClick={props.logout} ><ExitToAppIcon/></Button ></div> :
                    <NavLink to={'/login'}><LockOpenIcon/></NavLink>}
            </div>
        </header>
    );
}

export default Header;