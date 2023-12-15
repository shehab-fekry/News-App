import React, {useState} from "react";
import styles from './SearchBar.module.css';
import ArtclesList from "../Articles/ArticlesList";
import axios from "axios";

const SearchBar = (props) => {
    let [showSuggestions, setShowSuggestions] = useState(false);
    let [articles, setArticles] = useState([]);
    let [viewedArticles, setviewedArticles] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);

    // getting search suggestions from API
    const suggistionHandler = () => {
        if(articles.length == 0){
            axios.get('https://newsapi.org/v2/top-headlines?country=us&pageSize=30&apiKey=0308b0a480b8476ea2db40404f2af7b5')
            .then(data => {
                let articles = data.data.articles;
                let toview = articles.slice(0, 3);
                setviewedArticles(toview)
                setArticles(articles)  
                setShowSuggestions(!showSuggestions);
            })
            .catch(err => console.log(err))
        } 
        else setShowSuggestions(!showSuggestions);
    }

    // suggistions next page
    const nextPage = () => {
        if(currentPage <= 9){
            let nextPage = currentPage + 1;
            let from = currentPage * 3;
            let to = nextPage * 3;
            let newArticles = articles.slice(from, to);
            setCurrentPage(currentPage + 1);
            setviewedArticles(newArticles);
        }

    }

    // suggestions previous page
    const prevPage = () => {
        if(currentPage >= 2){
            let prevPage = currentPage - 1;
            let from = prevPage * 3;
            let to = currentPage * 3;
            let newArticles = articles.slice(from, to);
            setCurrentPage(currentPage - 1);
            setviewedArticles(newArticles);
        }
    }

    return (
        <div className={styles.container}>
            {/* Search Bar */}
            <input 
            className={styles.input} 
            type='text' 
            placeholder='Search News'
            onClick={suggistionHandler}/>
            <button className={styles.btn}>Search</button>
            
            {/* Suggistions List */}
            <div style={{
                display: showSuggestions ? 'block' : 'none',
            }} className={styles.suggestions}>
                <div className={styles.header}>
                <h2># Latest News</h2>
                <div className={styles.nav}>
                    <div className={styles.pointer} onClick={prevPage}>{"< "}</div>
                    <div>{currentPage}/10</div>
                    <div className={styles.pointer} onClick={nextPage}>{" >"}</div>
                </div>
                </div>
                <ArtclesList articles={viewedArticles}/>
            </div>
        </div>
    )
}

export default SearchBar;