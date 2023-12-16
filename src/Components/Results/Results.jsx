import React, { Fragment } from "react";
import ArtclesList from "../Articles/ArticlesList";
import styles from './Results.module.css';

const Results = (props) => {
    return (
        <div className={styles.Results}>
            <ArtclesList 
            articles={props.results} 
            type={props.switchPage == 0 ? 'results': 'wishlist'}
            addWish={props.addWish}
            removeWish={props.removeWish}/>
        </div>
    )
}

export default Results;