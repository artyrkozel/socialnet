import React, {useState} from "react";
import Paper from "@material-ui/core/Paper";
import TableCell from '@material-ui/core/TableCell';
import {withStyles, Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import TableBody from "@material-ui/core/TableBody";
import Avatar from "@material-ui/core/Avatar";
import TableContainer from "@material-ui/core/TableContainer";
import {FilterToUpAC, PricesType} from "../../../redux/prices-reducer";
import {useDispatch} from "react-redux";

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

type TablePricesType = {
    prices: PricesType[]
}

const TablePrices = (props: TablePricesType) => {
    const [percentChange, setPercentChange] = useState<boolean>(true)
    const [rankChange, setRankChange] = useState<boolean>(true)
    const dispatch = useDispatch()
    const classes = useStyles();

    const rankUp = () => {
        setRankChange(true)
        dispatch(FilterToUpAC(filteredToRank))
    }
    const rankDown = () => {
        setRankChange(false)
        dispatch(FilterToUpAC(filteredRankDown))
    }
    const SetUp = () => {
        setPercentChange(false)
        dispatch(FilterToUpAC(filteredToPercentage))
    }
    const SetDown = () => {
        setPercentChange(true)
        dispatch(FilterToUpAC(filteredToDown))
    }
    const filteredToPercentage = props.prices.slice().sort(function (a, b) {
        return a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h
    })
    const filteredToRank = props.prices.slice().sort(function (a, b){
        return a.market_cap_rank - b.market_cap_rank
    })
    const filteredToDown = filteredToPercentage.slice().reverse()
    const filteredRankDown = filteredToRank.slice().reverse()
    return (
        <>
            <TableContainer component={Paper} className={classes.wrTable}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Rank{ rankChange ? <ArrowDropUpIcon onClick={rankDown}/> : <ArrowDropDownIcon onClick={rankUp}/>}</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="center">Price</StyledTableCell>
                            <StyledTableCell align="center">24h change{ percentChange ? <ArrowDropUpIcon onClick={SetUp}/> : <ArrowDropDownIcon onClick={SetDown}/>}</StyledTableCell>
                            <StyledTableCell align="center">24 High</StyledTableCell>
                            <StyledTableCell align="center">24H volume</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.prices.map((row) => (
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
        </>
    )
}

export default TablePrices