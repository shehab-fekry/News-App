import React from "react";
import styles from './ArticleItem.module.css';

const ArticleItem = (props) => {
    let article = props.article;
    let date = new Date(article.publishedAt);
    return (
        <div className={styles.article}>
            <div className={styles.source}>{article.source.name}</div>
            <div className={styles.title}>{article.title}</div>
            <div className={styles.author}>Author: {article.author}</div>
            <footer className={styles.footer}>
                <div>Published: {date.getFullYear()}</div>
                <a href={article.url}>View</a>
            </footer>
        </div>
    )
}

export default ArticleItem;