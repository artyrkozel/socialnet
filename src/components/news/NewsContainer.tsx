import React from 'react';
import News from './News'
import {connect} from "react-redux";
import axios from "axios";
import {SetNewsAC} from "../../redux/news-reducer";
import {getIsFetching, getIsAuth} from "../../redux/users-selectors";
import {AppRootStateType} from "../../redux/redux-store";
import {toggleIsFetching} from "../../redux/users-reducer";

class NewsContainer extends React.Component<any> {
    componentDidMount() {
        toggleIsFetching(true)
        axios.get('http://newsapi.org/v2/top-headlines?country=ru&apiKey=3fd36eac8b36479bb017949defda9df3').then(response => {
            this.props.SetNewsAC(response.data.articles)
            toggleIsFetching(false)
        })

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

export default connect(mapStateToProps,{SetNewsAC,toggleIsFetching})(NewsContainer)