import React, {useState} from "react";
import {Select, MenuItem, TextField, Button} from "@material-ui/core";
import {BiggestValuesType} from "../biggestValues/BiggestValues";
import {makeStyles} from '@material-ui/core/styles';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import RedoIcon from '@material-ui/icons/Redo';
type ArrType = {
    name: string
    current_price: number
}
const Exchange: React.FC<BiggestValuesType> = React.memo(({prices, ...props}) => {
    let arr = [] as Array<ArrType>
    for (let i = 0; i < prices.length; i++) {
        arr.push({name: prices[i].name, current_price: prices[i].current_price})
    }

    const [values, SetValues] = useState<{ price1: any, price2: any, value1: any, value2: any }>({
        price1: 0,
        value1: 1,
        price2: 0,
        value2: 0
    })
    let b = values
    const exchangeValues = () => {
        SetValues({
            ...values, value2: b.price1 * b.value1 / b.price2,
        })
    }

    const compare = (arr: Array<ArrType>, value: any) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === value) {
                return arr[i].current_price
            }
        }
    }
    const changePrice1 = (event: React.ChangeEvent<{ value: any }>) => {
        let a = compare(arr, event.target.value)
        SetValues({
            ...values, price1: a
        })

    }
    const changePrice2 = (event: React.ChangeEvent<{ value: any }>) => {
        let a = compare(arr, event.target.value)
        if ( a !== undefined){
            SetValues({
                ...values, price2: a, value2: b.price1 * b.value1 / a
            })
        }
    }
    const changeValue1 = (event: React.ChangeEvent<{ value: any }>) => {
        SetValues({
            ...values, value1: event.target.value, value2: b.price1 * event.target.value / b.price2,
        })
    }

    const useStyles = makeStyles({
        wrapper: {
            display: 'flex',
            alignItems: 'flex-end',
            marginTop: '60px'
        },
        select: {
            '&$focus': {
              backgroundColor: 'transparent'
            },
            width: '175px',
            '& .MuiSelect-select' : {
                padding: '14px'
            },
            marginRight: '20px',
            marginLeft: '20px'
        },
        MuiInputInput : {
            '& .MuiTextField-root': {
                width: '25ch',
                textAlign: 'center'
            },
            '& .MuiInputBase-input': {
                textAlign: 'center'
            },
        },
        divider : {
            margin: '20px'
        },
        rightSide: {
            display: 'flex',
            alignItems: 'flex-end'
        }
    });
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.rightSide}>
                <TextField className={classes.MuiInputInput} type="number" label="Base Currency" id="standard-basic" value={values.value1} onChange={changeValue1}/>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={changePrice1}
                    className={classes.select}
                >
                    {arr.map(el => <MenuItem key={el.name} value={el.name}>{el.name}</MenuItem>)}
                </Select>
            </div>
            <div className={classes.divider}>
                <RedoIcon />
            </div>
                <Select
                    id="demo-simple-select"
                    label="Converts to"
                    onChange={changePrice2}
                    className={classes.select}
                >
                    {arr.map(el => <MenuItem key={el.name} value={el.name}>{el.name}</MenuItem>)}
                </Select>
                <TextField type="number" id="standard-basic" value={values.value2}/>
                <Button onClick={exchangeValues} variant="contained"><AutorenewIcon/>Exchange</Button>
        </div>

    )
})
export default Exchange