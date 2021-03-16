import React from "react";
import s from './FormsControls.module.css'
import {FormControlLabel, Input, TextField} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from '@material-ui/icons/Lock';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

// @ts-ignore
export const Textarea = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error
    return (
        <div className={hasError ? s.formControl : ''}>
            <div>
                <TextField style = {{width: 600}}  id="filled-basic" label="Enter your message" variant="filled" {...input} {...props}/>
            </div>
            <div>
                {hasError && <span>{error}</span>}
            </div>
        </div>

    )
}

// @ts-ignore
export const renderInput = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error
    return (
        <div className={hasError ? s.formControl : ''}>
            <div>
                <Input {...input} {...props}  id="standard-basic" label={props.label}/>
                {/*<TextField {...input} {...props}  id="standard-basic" label={props.label}/>*/}
            </div>
            <div>
                {hasError && <span>{error}</span>}
            </div>
        </div>

    )
}
// @ts-ignore
export const LoginInput = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error
    return (
        <div className={hasError ? s.formControl : ''}>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <LockIcon />
                </Grid>
                <Grid item>
                    <TextField autoComplete={false} {...input} {...props} fullWidth id="standard-basic" label={props.label}/>
                </Grid>
            </Grid>
            <div className={s.error}>
                {hasError && <span>{error}</span>}
            </div>
        </div>

    )
}


// @ts-ignore
export const PassInput = ({input, meta: {touched, error}, classes, ...props}) => {
    const hasError = touched && error
    return (
        <div className={hasError ? s.formControl : ''}>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <AccountCircle />
                </Grid>
                <Grid item>
                    <TextField {...input} {...props} fullWidth id="standard-basic" label={props.label} />
                </Grid>
            </Grid>
            <div className={s.error}>
                {hasError && <span>{error}</span>}
            </div>
        </div>

    )
}
const WhiteCheckbox = withStyles({
    root: {
        color: '#fff',
        '&$checked': {
            color: '#fff',
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const BlackCheckbox = withStyles({
    root: {
        color: '#000',
        '&$checked': {
            color: '#000',
        },
        padding: '0px'
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

// @ts-ignore
export const renderCheckbox = ({ input }) => {
    return (
        <FormControlLabel
            style={{padding: '0px', color: '#fff'}}
            control={
                <WhiteCheckbox
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                />
            }
            label="Remember me"
            labelPlacement="end"
        />
    )
}
// @ts-ignore
export const renderCheckboxBlack = ({ input }) => {
    return (
        <FormControlLabel
            style={{padding: '0px', color: '#000'}}
            control={
                <BlackCheckbox
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                />
            }
            label=""
        />
    )
}



