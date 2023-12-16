import React, { useState } from "react";
import styles from './ArticleItem.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ArticleItem = (props) => {
    let article = props.article;
    let date = new Date(article.publishedAt);
    let [isWishlisted, setIsWishlisted] = useState(false);

    const addHandler = () => {
        props.addWish();
        setIsWishlisted(true);
    }

    const removeHandler = () => {
        props.removeWish();
        setIsWishlisted(false);
    }

    return (
        <div className={styles.article} style={{display: article.visibility ? 'block' : 'none'}}>
            <div className={styles.source}>{article.source.name}</div>
            <div className={styles.title}>{article.title}</div>
            <div className={styles.author}>Author: {article.author}</div>
            <footer className={styles.footer}>
                <div>Published: {date.getFullYear()}</div>
                <div>
                    {/* showing buttons depend on the articleList component place in application */}
                    <a href={article.url} target="_blank">View</a>
                    {props.type == 'results'&& <button 
                    disabled={isWishlisted || article.listed} 
                    onClick={addHandler} 
                    style={{
                        backgroundColor: (isWishlisted || article.listed) && '#ff4d4d',
                        color: (isWishlisted || article.listed) && 'white'}}>
                            <FontAwesomeIcon icon={faHeart} style={{color: (isWishlisted || article.listed) ? "white" : '#333'}} />
                    </button>}
                    
                    {props.type == 'wishlist'&& <button onClick={removeHandler}>Remove</button>}
                </div>
            </footer>
        </div>
    )
}

export default ArticleItem;