import React from "react";
import ArticleItem from "./ArticleItem";
import styles from './ArticleList.module.css';

const ArtclesList = (props) => {
    let articles = props.articles;
    return (
        <ul className={styles.list}>
            {articles?.map((article, indx) => <ArticleItem key={indx} article={article}/>)}
        </ul>
    )
}

export default ArtclesList;