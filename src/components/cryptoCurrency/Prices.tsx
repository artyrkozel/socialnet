import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {requestPrices} from "../../redux/prices-reducer";
import {getPrices} from "../../redux/users-selectors";
import {withStyles, Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from "@material-ui/core/Avatar";
import BiggestValues from "./biggestValues/BiggestValues";
import {Typography} from "@material-ui/core";
import Exchange from "./exchange/Exchange";

export const Prices =() => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(requestPrices())
    },[])
    const prices = useSelector(getPrices)
    console.log(prices)

    const StyledTableCell = withStyles((theme: Theme) =>
        createStyles({
            head: {
                backgroundColor: 'transparent',
                color: theme.palette.common.black,
                fontWeight: 'bold',
                textTransform: 'uppercase'
            },
            body: {
                fontSize: 14,
            },
        }),
    )(TableCell);
    const StyledTableRow = withStyles((theme: Theme) =>
        createStyles({
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.action.hover,
                },
            },
        }),
    )(TableRow);

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


    return (<div>
            <Typography variant="body2" color="secondary" component="h1" className={classes.mainTitle}>
                Top Movers
            </Typography>
            <BiggestValues prices={prices}/>
            <Exchange prices={prices}/>
            <TableContainer component={Paper} className={classes.wrTable}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Rank</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="center">Price</StyledTableCell>
                            <StyledTableCell align="center">24h change</StyledTableCell>
                            <StyledTableCell align="center">24 High</StyledTableCell>
                            <StyledTableCell align="center">24H volume</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {prices.map((row) => (
                            <StyledTableRow key={row.id} className={classes.hover}>
                                <StyledTableCell component="th" scope="row">
                                    {row.market_cap_rank}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" className={classes.rowStyles}>
                                    <Avatar className={classes.avatar} alt="Remy Sharp" src={row.image}/>
                                    <div className={classes.cryptoName}>{row.name}</div>
                                    <span className={classes.symbol}>{row.symbol}</span>

                                </StyledTableCell>
                                <StyledTableCell align="center">${row.current_price}</StyledTableCell>
                                <StyledTableCell
                                    className={row.market_cap_change_percentage_24h > 0 ? classes.volumePlus : classes.volumeMinus}
                                    align="center">{row.market_cap_change_percentage_24h.toFixed(2)}%</StyledTableCell>
                                <StyledTableCell align="center">${row.high_24h}</StyledTableCell>
                                <StyledTableCell align="center">${row.total_volume}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}