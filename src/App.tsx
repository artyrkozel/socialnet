import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Nav from './components/nav/nav'
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from './components/header/headerContainer';
import Login from "./components/login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {AppRootStateType} from "./redux/redux-store";
import {withRouter} from 'react-router-dom'
import {Prices} from "./components/cryptoCurrency/Prices";
import NewsContainer from "./components/news/NewsContainer";
import { Users } from './components/users/Users';
import { ChatPage } from './components/pages/Chat/ChatPage';

class App extends React.Component<any, any> {
    componentDidMount() {
        this.props.initializeApp()
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="App">
                <HeaderContainer/>
                <div className="app-wrapper">
                    <Nav/>
                    <div className='app-wrapper-content'>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route exact path='/users' render={() => <Users/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='/news' render={() => <NewsContainer />}/>
                        <Route path='/rates' render={() => <Prices />}/>
                        <Route path='/chat' render={() => <ChatPage />}/>
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
