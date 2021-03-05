import React from 'react';
import c from './News.module.css'
import newsPhoto from './../../assets/images/newsPhoto.jpg'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Prices } from '../cryptoCurrency/Prices';


export type NewsItemType = {
    author: string | null
    content: string
    description: string
    publishedAt: string
    source: SourceType
    title: string
    url: string
    urlToImage: string
}
type SourceType = {
    id: string
    name: string
}
export type NewsItem = {
    news: Array<NewsItemType>
}
export type NewsItem2 = {
    news: NewsItem
}

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const News = (props: NewsItem2) => {
    const classes = useStyles();
    return (
        <div>
            <Prices />
        </div>)
//         <div className={c.newsWr}>
//             {props.news.news.map(u =>
//             <div key={u.url} className={c.newsItem}>
//                 <Card className={classes.root}>
//                     <CardActionArea>
//                         <CardMedia
//                             className={classes.media}
//                             image={u.urlToImage ? u.urlToImage : newsPhoto}
//                             title="Contemplative Reptile"
//                         />
//                         <CardContent>
//                             <Typography gutterBottom variant="h6" component="h2">
//                                 {u.title}
//                             </Typography>
//                             <Typography variant="body2" color="textSecondary" component="p">
//                                 {u.description}
//                             </Typography>
//                         </CardContent>
//                     </CardActionArea>
//                     <CardActions>
//                         <Button variant="contained" color="primary" href={u.url}>
//                             Link
//                         </Button>
//
//                     </CardActions>
//                 </Card>
//             </div>
//         )}</div>
// );
}

export default News;