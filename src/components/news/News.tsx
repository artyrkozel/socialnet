import React from 'react';
import c from './News.module.css'
import newsPhoto from './../../assets/images/newsPhoto.jpg'
import {Button} from "@material-ui/core";
import Preloader from "../Preloader";

export type NewsType = {
    news: Array<NewsItem>
}
type SourceType = {
    id: string
    name: string
}
export type NewsItem = {
    author: string
    content: string
    description: string
    publishedAt: string
    source: SourceType
    title: string
    url: string
    urlToImage: string
}

const News = (props: NewsType) => {
    if(!props.news){
        return <Preloader />
    }
    return (
        //@ts-ignore
        <div>{props.news.news.map(u =>
            <div className={c.newsItem}>
                <div className={c.heading}>{u.title}</div>
                <div className={c.newsBlock}>
                    <img className={c.newsPhoto} src={u.urlToImage ? u.urlToImage : newsPhoto}/>
                    <div>
                        <div className={c.newsData}>
                            {u.author ? <div>{u.source.name}</div> : <div>CNN</div>}
                            <div>{u.publishedAt}</div>
                        </div>
                        <div className={c.description}>{u.description}</div>
                        <Button variant="contained"><a href={u.url}>Read More</a></Button>
                    </div>
                </div>

            </div>
        )}</div>
);
}

export default News;