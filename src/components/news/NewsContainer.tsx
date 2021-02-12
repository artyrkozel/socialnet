import React from 'react';
import News from './News'
import {connect} from "react-redux";
import axios from "axios";
import {SetNewsAC} from "../../redux/news-reducer";

class NewsContainer extends React.Component<any> {
    componentDidMount() {
        axios.get('http://newsapi.org/v2/top-headlines?country=us&apiKey=3fd36eac8b36479bb017949defda9df3').then(response => {
            this.props.SetNewsAC(response.data.articles)
        })
    }
    render() {
        return <News news={this.props.news}/>
    }
}
let mapStateToProps = (state: any) => ({
    news: state.news
})

export default connect(mapStateToProps,{SetNewsAC})(NewsContainer)