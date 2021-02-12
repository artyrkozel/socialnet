import React from "react";
import s from './FormsControls.module.css'
import {Checkbox, FormControlLabel, Grid, TextField} from "@material-ui/core";
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
export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={hasError ? s.formControl : ''}>
            <div>
                <TextField {...input} {...props}  id="standard-basic" label={props.label}/>
            </div>
            <div>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>

    )
}

// @ts-ignore
export const renderCheckbox = ({ input, label }) => (
    <div>
        <FormControlLabel
            control={
                <Checkbox
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                />
            }
            label={label}
        />
    </div>
)