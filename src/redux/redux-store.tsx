import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware  from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import newsReducer from "./news-reducer";

let reducers = combineReducers({
        profile: profileReducer,
        dialogs:dialogsReducer,
        usersPage: usersReducer,
        auth: authReducer,
        form: formReducer,
        app: appReducer,
        news: newsReducer
    }
)

export type AppRootStateType = ReturnType<typeof reducers>
let store = createStore(reducers,applyMiddleware(thunkMiddleware))
export default store

// @ts-ignore
window.store = store;