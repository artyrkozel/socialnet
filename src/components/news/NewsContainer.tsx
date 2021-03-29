import React from 'react';
import News from './News'
import {connect} from "react-redux";
import {requestNews, SetNewsAC} from "../../redux/news-reducer";
import {getIsFetching, getIsAuth} from "../../redux/users-selectors";
import {AppRootStateType} from "../../redux/redux-store";
import {toggleIsFetching} from "../../redux/users-reducer";

class NewsContainer extends React.Component<any> {
    componentDidMount() {
        this.props.requestNews()

    }
    render() {
        return (
        <>
            <News news={this.props.news}/>
        </>
        )
    }
}
let mapStateToProps = (state: AppRootStateType) => ({
    news: state.news,
    isFetching: getIsFetching(state),
    isAuth : getIsAuth(state)
})

export default connect(mapStateToProps,{SetNewsAC,toggleIsFetching,  requestNews})(NewsContainer)