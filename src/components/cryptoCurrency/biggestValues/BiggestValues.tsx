import React from "react";
import {PricesType} from "../../../redux/prices-reducer";
import {Card, CardContent, CardMedia, Typography} from "@material-ui/core";
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

export type BiggestValuesType = {
    prices: Array<PricesType>
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 'calc((100% - 72px)/4)',
            boxShadow: '0 4px 10px 3px rgb(0 0 0 / 5%)',
            '&:hover': {
                transition: '.6s',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 10px 3px rgb(0 0 0 / 8%)',
                cursor: 'pointer'
            }
        },
        wrapper: {
            marginTop: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
        },
        cryptoIcon: {
            height: 38,
            width: 38,
            marginBottom: '10px',
        },
        volumePlus: {
            color: 'green',
            fontSize: '16px',
        },
        volumeMinus: {
            color: 'red',
            fontSize: '16px',
        },
        symbol: {
            marginLeft: '10px',
            color: 'rgba(0,0,0,.5)',
            textTransform: 'uppercase',
            fontSize: '16px',
        },
        name: {
            fontSize: '16px',
            color: '#000',
            fontWeight: 'bold',
        },
        currentPrice: {
            fontSize: '24px',
            color: '#000'
        }
    }),
);
const BiggestValues: React.FC<BiggestValuesType> = ({prices, ...props}) => {
    const classes = useStyles();
    const filteredArr = prices.slice().sort(function (a, b) {
        if (Math.abs(a.market_cap_change_percentage_24h) > Math.abs(b.market_cap_change_percentage_24h)) {
            return 1;
        }
        if (Math.abs(a.market_cap_change_percentage_24h) < Math.abs(b.market_cap_change_percentage_24h)) {
            return -1;
        }
        return 0;
    })
    const topArr = filteredArr.slice(filteredArr.length - 4)
    return (
        <div className={classes.wrapper}>
            {topArr.map(el => {
                return (
                    <Card className={classes.root} key={el.id}>
                        <CardContent>
                            <CardMedia
                                className={classes.cryptoIcon}
                                image={el.image}
                            />
                            <Typography variant="body2" color="textSecondary" component="span" className={classes.name}>
                                {el.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="span"
                                        className={classes.symbol}>
                                {el.symbol}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="span">
                                <div className={classes.wrapper}>
                                    <div className={classes.currentPrice}><AttachMoneyIcon/>{el.current_price}</div>
                                    {el.price_change_percentage_24h > 0 ?
                                        <div className={classes.volumePlus}>
                                            {el.price_change_percentage_24h.toFixed(2)}%
                                        </div> :
                                        <div className={classes.volumeMinus}>
                                            {el.price_change_percentage_24h.toFixed(2)}%
                                        </div>}
                                </div>
                            </Typography>
                        </CardContent>

                    </Card>
                )
            })}
        </div>
    )
}

export default BiggestValues