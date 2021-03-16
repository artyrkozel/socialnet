import React, {useState} from "react";
import {Select, MenuItem, TextField, InputLabel, FormControl} from "@material-ui/core";
import {BiggestValuesType} from "../biggestValues/BiggestValues";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import RedoIcon from '@material-ui/icons/Redo';

type FilteredArrType = {
    name: string
    current_price: number
}
const Exchange: React.FC<BiggestValuesType> = React.memo(({prices, ...props}) => {

    let filteredArray = [] as Array<FilteredArrType>
    for (let i = 0; i < prices.length; i++) {
        filteredArray.push({name: prices[i].name, current_price: prices[i].current_price})
    }

    const [value2, SetValue2] = useState<any>(0)
    const [price1, setPrice1] = useState<any>(0)
    const [value1, setValue1] = useState<any>(1)
    const [price2, setPrice2] = useState<any>(0)

    const compare = (arr: Array<FilteredArrType>, value: any) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === value) {
                return arr[i].current_price
            }
        }
    }
    const changePrice1 = (event: React.ChangeEvent<{ value: any }>) => {
        let a = compare(filteredArray, event.target.value)
        setPrice1(a)
        if (a !== undefined) {
            SetValue2(a * value1 / price2)
        }
    }
    const changePrice2 = (event: React.ChangeEvent<{ value: any }>) => {
        let a = compare(filteredArray, event.target.value)
        if (a !== undefined) {
            setPrice2(a)
            SetValue2(price1 * value1 / a)
        }
    }
    const changeValue1 = (event: React.ChangeEvent<{ value: any }>) => {
        setValue1(event.target.value)
        SetValue2(
            price1 * event.target.value / price2,
        )
    }


    const useStyles1 = makeStyles((theme: Theme) =>
        createStyles({
            formControl: {
                minWidth: 175,
                '& .MuiInputLabel-formControl': {
                    left: '25px'
                }
            },

        }),
    );
    const useStyles = makeStyles({
        wrapper: {
            marginTop: '70px'
        },
        exchangeFields: {
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginTop: '25px'
        },
        select: {
            width: '175px',
            '& .MuiSelect-select': {
                padding: '14px'
            },
            marginRight: '20px',
            marginLeft: '20px'
        },
        MuiInputInput: {
            '& .MuiTextField-root': {
                width: '25ch',
                textAlign: 'center'
            },
            '& .MuiInputBase-input': {
                textAlign: 'center'
            },
        },
        divider: {
            margin: '10px'
        },
        exchangedValue: {
            fontSize: '25px',
            marginTop: '10px'
        },
        exchangedValueTitle: {
            color: 'rgba(0, 0, 0, 0.54)'
        },
        rightSide: {
            display: 'flex',
            alignItems: 'flex-end'
        },
        result: {
            textAlign: 'center'
        },
    });
    const classes = useStyles();
    const classws = useStyles1()
    return (
        <div className={classes.wrapper}>
            <div className={classes.result}>
                <div className={classes.exchangedValueTitle}>Exchange Rates :</div>
                <div className={classes.exchangedValue}>{Number.isNaN(value2) || value2 === Infinity ? 0 : value2}</div>
            </div>
            <div className={classes.exchangeFields}>
                <TextField className={classes.MuiInputInput} type="number" id="standard-basic"
                           value={value1} onChange={changeValue1}/>
                <FormControl className={classws.formControl}>
                    <InputLabel>Base Currency</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={changePrice1}
                        defaultValue=""
                        className={classes.select}
                    >
                        {filteredArray.map(el => <MenuItem key={el.name} value={el.name}>{el.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <div className={classes.divider}>
                    <RedoIcon/>
                </div>
                <FormControl className={classws.formControl}>
                    <InputLabel>Converts to</InputLabel>
                    <Select
                        id="demo-simple-select"
                        label="Converts to"
                        onChange={changePrice2}
                        defaultValue=""
                        className={classes.select}
                    >
                        {filteredArray.map(el => <MenuItem key={el.name} value={el.name}>{el.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </div>
        </div>
    )
})
export default Exchange