import {SendMessageType, dialogsPageType, ActionsTypes} from "./store";


const SEND_MESSAGE = 'SEND-MESSAGE'

export const sendMessageCreator = (newMassageBody: string):SendMessageType => {
    return {type: SEND_MESSAGE, newMassageBody}
}

let initialState = {
        massages: [
            {id: 1, massage: "First massage"},
            {id: 2, massage: "Second massage"},
            {id: 3, massage: "Next massage"},
            {id: 4, massage: "Last massage"},
        ],
        diologsData: [
            {id: 1, name: "Artur"},
            {id: 2, name: "Valera"},
            {id: 3, name: "Ignat"},
            {id: 4, name: "Vova"},
        ],
}

const dialogsReducer = ( state:dialogsPageType = initialState, action: ActionsTypes): dialogsPageType => {

    switch (action.type) {
        case  SEND_MESSAGE:
            let body = action.newMassageBody
            return  {
                ...state,
                massages: [...state.massages, {id: 5, massage: body}]
            }
        default:
            return state
    }

}

export default dialogsReducer