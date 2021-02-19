import React from 'react';
import './App.css';
import {BrowserRouter, HashRouter, Route, Router} from "react-router-dom";
import Nav from './components/nav/nav'
import DiologsContainer from "./components/dialogs/DiologsContainer";
import UsersContainer from "./components/users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from './components/header/headerContainer';
import Login from "./components/login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/Preloader";
import NewsContainer from './components/news/NewsContainer';
import {AppRootStateType} from "./redux/redux-store";
import ChatPage from "./pages/chat/ChatPage";
import { withRouter } from 'react-router-dom'
class App extends React.Component<any, any> {
    componentDidMount() {
        this.props.initializeApp()
    }
    render() {
        if(!this.props.initialized){return <Preloader/>}
        return (
            <div className="App">
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Nav/>
                    <div className='app-wrapper-content'>
                                <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                                <Route path='/diologs' render={() => <DiologsContainer/>}/>
                                <Route path='/users' render={() => <UsersContainer/>}/>
                                <Route path='/login' render={() => <Login/>}/>
                                <Route path='/news' render={() => <NewsContainer/>}/>
                                <Route path='/chat' render={() => <ChatPage/>}/>
                    </div>
                </div>
            </div>

        );
    }
}
const mapStateToProps = (state: AppRootStateType) => ({
    initialized: state.app.initialized
})
export default connect(mapStateToProps, {initializeApp, withRouter})(App);
