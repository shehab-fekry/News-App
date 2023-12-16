import React, {useRef, useState} from "react";
import styles from './SearchBar.module.css';
import ArtclesList from "../Articles/ArticlesList";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = (props) => {
    let [showSuggestions, setShowSuggestions] = useState(false);
    let [articles, setArticles] = useState([]);
    let [viewedArticles, setviewedArticles] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);
    const searchRef = useRef();

    // getting search suggestions from API
    const suggistionHandler = (type) => {
        if(type == 'click' && articles.length == 0){
            axios.get('https://newsapi.org/v2/top-headlines?country=us&pageSize=30&apiKey=0308b0a480b8476ea2db40404f2af7b5')
            .then(data => {
                let articles = data.data.articles;
                articles.forEach(article => article.visibility = true);
                let toview = articles.slice(0, 3);
                
                setviewedArticles(toview)
                setArticles(articles)  
                setShowSuggestions(!showSuggestions);
            })
            .catch(err => console.log(err))
        } 
        else if (type == 'change'){
            if(showSuggestions == true)
                setShowSuggestions(false);
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

    const submitHandler = () => {
        let searchValue = searchRef.current.value;
        searchValue = searchValue.split(' ');
        searchValue = searchValue.join(' AND ');
        searchValue = '(' + searchValue + ')';

        props.onSearch(searchValue);        
    }

    return (
        <div className={styles.container}>
            {/* Search Bar */}
            <input 
            className={styles.input} 
            type='text'
            placeholder='Search News'
            ref={searchRef}
            onClick={()=> suggistionHandler('click')}
            onChange={() => suggistionHandler('change')}/>
            <button className={styles.btn} onClick={submitHandler}>
                <FontAwesomeIcon  icon={faMagnifyingGlass} style={{color: "#ffffff",}} />
            </button>
            
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