import React from 'react';
import {NavLink} from "react-router-dom";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import logo from './../../assets/images/logog.png'
import {HeaderPropsType} from './headerContainer';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        logo: {
            width: 140
        },
        container: {
            width: 1200,
            margin: '0 auto',
        }
    }),
);

const Header: React.FC<HeaderPropsType> = (props) => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <div className={classes.container}>
                <Toolbar className={classes.root}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <NavLink to="/profile"><img className={classes.logo} src={logo} alt={'logo'}/></NavLink>
                    </IconButton>
                    {props.isAuth ?
                        <div>{props.login} - <Button onClick={props.logout}><ExitToAppIcon/></Button></div> :
                        <NavLink to={'/login'}><LockOpenIcon/></NavLink>}
                </Toolbar>
            </div>

        </AppBar>
    );
}

export default Header;