import React from 'react';
import News from './News'
import {connect} from "react-redux";
import axios from "axios";
import {InitialType, SetNewsAC} from "../../redux/news-reducer";
import {getIsFetching} from "../../redux/users-selectors";
import Preloader from "../Preloader";
import {AppRootStateType} from "../../redux/redux-store";
import {toggleIsFetching} from "../../redux/users-reducer";
import {newsAPI} from "../../api/api";
import {GetPricesAC, requestPrices} from "../../redux/prices-reducer";

class NewsContainer extends React.Component<any> {
    componentDidMount() {
        toggleIsFetching(true)
        axios.get('http://newsapi.org/v2/top-headlines?country=ru&apiKey=3fd36eac8b36479bb017949defda9df3').then(response => {
            this.props.SetNewsAC(response.data.articles)
        })
        toggleIsFetching(false)
    }
    render() {
        return (
        <>
            {this.props.isFetching ? <Preloader/> : null}
            <News news={this.props.news}/>
        </>
        )
    }
}
let mapStateToProps = (state: AppRootStateType) => ({
    news: state.news,
    isFetching: getIsFetching(state),
})

export default connect(mapStateToProps,{SetNewsAC,toggleIsFetching})(NewsContainer)