import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {renderCheckbox, LoginInput, PassInput} from "../../common/formControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validator";
import {Button} from "@material-ui/core";
import {LoginFormDataType} from "../Login";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({
    loginContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: '50px',
        '& .MuiInputBase-root': {
            paddingTop: '7px',
            fontSize: '20px',
            background: 'transparent',
        },
    },
    loginForm: {
        textAlign: 'left',
        background: '-webkit-linear-gradient(top, #7579ff, #b224ef)',
        padding: '55px 55px 37px 55px',
        borderRadius: '10px',
        '& .MuiSvgIcon-root': {
            color: '#fff'
        },
        '& .MuiInputLabel-root': {
            color: '#fff'
        },
        '& .MuiInput-underline': {
            '&:before' : {
                color: 'red'
            }
        }
    },
    mainTitle: {
        fontSize: '27px',
        marginBottom: '0'
    },
    buttonStyles: {
        backgroundColor: '#fff',
        border: 0,
        fontWeight: 700,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: '#555555',
        height: 48,
        padding: '0 30px',
        transition: '0.5s',
        '&:hover': {
            backgroundColor: 'lightsteelblue',
            color: '#fff',
            borderColor: '-webkit-linear-gradient(bottom, #7579ff, #b224ef)',
            boxShadow: 'none',
        },

    },
    formTitle: {
        fontSize: '30px',
        color: '#fff',
        lineHeight: '1.2',
        textAlign: 'center',
        textTransform: 'uppercase',
        display: 'block',
        paddingTop: '27px',
        paddingBottom: '34px',
        fontWeight: 700,
    },
    '& .MuiFormControlLabel-root': {
      color: '#fff'
    },
    loginFormBtn: {
        display: 'flex',
        justifyContent: 'center',
    }
});
const maxLength = maxLengthCreator(20)
type LoginFormPropsType = {}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormPropsType> & LoginFormPropsType> = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.loginContainer}>
            <div>
                <form className={classes.loginForm} onSubmit={props.handleSubmit}>
                    <span className={classes.formTitle}>Log in</span>
                    <Field placeholder={'Email'}  name={'email'} component={PassInput}
                           validate={[required, maxLength]}
                           label={'Email'}/>
                    <Field placeholder='password' name={'password'} type={"password"} component={LoginInput}
                           validate={[required, maxLength]} label={'Password'}/>

                    <Field type={"checkbox"} name={'rememberMe'} component={renderCheckbox} label={"Remember me"}/>
                    {props.error && <div>{props.error}</div>}
                    <div className={classes.loginFormBtn}>
                        <Button
                            className={classes.buttonStyles}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormPropsType>({
    form: 'login'
})(LoginForm)

export default LoginReduxForm