import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {requestPrices} from "../../redux/prices-reducer";
import {getIsAuth, getIsFetching, getPrices} from "../../redux/users-selectors";
import {makeStyles} from '@material-ui/core/styles';
import BiggestValues from "./biggestValues/BiggestValues";
import {Typography} from "@material-ui/core";
import Exchange from "./Exchange/Exchange";
import {Redirect} from "react-router-dom";
import TablePrices from "./tablePrices/TablePrices";
import Preloader from "../common/Preloader/Preloader";

export const Prices =() => {

    const dispatch = useDispatch()
    const prices = useSelector(getPrices)
    const isAuth = useSelector(getIsAuth)
    const isFetching = useSelector(getIsFetching)
    useEffect(() => {
            dispatch(requestPrices())
    },[dispatch])
    const useStyles = makeStyles({
        table: {
            minWidth: 700,
        },
        wrTable: {
            marginTop: '60px',
        },
        volumePlus: {
            color: 'green'
        },
        volumeMinus: {
            color: 'red'
        },
        rowStyles: {
            display: 'flex',
            alignItems: 'center'
        },
        cryptoName: {
            margin: '0 12px',
            color: '#626973',
            fontWeight: 'bold'
        },
        avatar: {
            width: '20px',
            height: '20px'
        },
        hover: {
            '&:hover': {
                transition: '.6s',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 10px 3px rgb(0 0 0 / 8%)',
                cursor: 'pointer'
            }
        },
        symbol: {
            textTransform: 'uppercase',
            opacity: '.5'
        },
        mainTitle: {
            fontSize: '24px',
            color: '#000',
            marginTop: '50px'
        }
    });
    const classes = useStyles();
    if(isAuth === false) return <Redirect to={'login'}/>
    if(isFetching) return <Preloader />
    return (
        <>
            <Typography variant="body2" color="secondary" component="h1" className={classes.mainTitle}>
                Top Movers
            </Typography>
            <BiggestValues prices={prices}/>
            <Exchange prices={prices}/>
            <TablePrices prices={prices}/>
        </>
    )
}