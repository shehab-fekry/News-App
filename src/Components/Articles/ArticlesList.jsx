import React from "react";
import ArticleItem from "./ArticleItem";
import styles from './ArticleList.module.css';

const ArtclesList = (props) => {
    let articles = props.articles;
    return (
        <ul className={styles.list}>
            {articles?.map((article, indx) => (
            <ArticleItem 
            key={indx} 
            article={article} 
            type={props.type} 
            addWish={() => props.addWish(indx)}
            removeWish={() => props.removeWish(indx, article.index)}/>))}
        </ul>
    )
}

export default ArtclesList;