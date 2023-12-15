import React, { Fragment } from "react";
import ArtclesList from "../Articles/ArticlesList";
import styles from './Results.module.css';

const Results = (props) => {
    return (
        <div className={styles.Results}>
            <ArtclesList articles={props.results}/>
        </div>
    )
}

export default Results;