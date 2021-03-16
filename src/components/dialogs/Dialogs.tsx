import React from "react";
import c from './Diologs.module.css'
import DiologItem from "./DiologItem/DiologItem";
import Massage from "./Massage/Massage";
import {dialogsPageType} from "../../redux/store";
import { Redirect } from "react-router-dom";
import { reduxForm, Field }  from "redux-form";
import {Textarea} from "../common/formControls/FormsControls";
import {maxLengthCreator, required} from "../utils/validators/validator";

 type DialogsPropsType = {
     updateMessageBody: (body: string) => void
     sendMessage: (newMassageBody:string) => void
     dialogs: dialogsPageType
     isAuth: boolean

}
const maxLength = maxLengthCreator(100)

const Dialogs:React.FC<DialogsPropsType> = (props) => {
    let state = props.dialogs
    let dialogsElement = state.diologsData.map(d => <DiologItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElement = state.massages.map(massage => <Massage massage={massage.massage} key={massage.id}/>);

    let addNewMessage = (values:any) => {
        props.sendMessage(values.newMassageBody)
    }
    if(props.isAuth === false) return <Redirect to={'login'}/>
    return (
        <div className={c.diologs}>
            <div className={c.diologsItems}>
                {dialogsElement}
            </div>
            <div className={c.massages}>
                <div>{messagesElement}</div>
                <div>
                    <div>
                        <AddMessageFormRedux onSubmit={addNewMessage}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

const AddMessageForm = (props: any) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='enter your message' name={'newMassageBody'} component={Textarea} validate={[required,maxLength]}/>
            </div>
            <div >
                <button>send</button>
            </div>
        </form>
    )
}
const AddMessageFormRedux = reduxForm({
    form: 'dialogMessageForm'
})(AddMessageForm)

export default Dialogs