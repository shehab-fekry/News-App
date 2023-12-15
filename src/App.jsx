import { useState } from 'react';
import './App.css'

import axios from 'axios';
import SearchBar from './Components/SearchBar/SearchBar';
import Results from './Components/Results/Results';
import Controls from './Components/Controls/Controls';

function App() {
  let [results, setResults] = useState([]);
  let [filteredResults, setFilteredResults] = useState([]);
  let [switchPage, setSwitchPage] = useState(0); // search Results or wishlist
  let [wishList, setWishList] = useState([]); // wishlist of news


  const searchHandler = (searchValues) => {
    let q = searchValues;
    axios.get(`https://newsapi.org/v2/everything?q=${q}&sortBy=relevancy&page=1&pageSize=10&apiKey=0308b0a480b8476ea2db40404f2af7b5`)
    .then(data => {
      setResults(data.data.articles);
      setFilteredResults(data.data.articles)
    })
    .catch(err => console.log(err))
  }

  const navigateHandler = (value) => {
    switch(value){
      case 'R':
        setSwitchPage(0);
        break;
      case 'W':
        setSwitchPage(1);
        break;
      default:
        return
    }
  }

  const filterHandler = (source, date) => {
    let dateModifiedResults = [...results];
    let Mdate;
    
    // modify date format
    dateModifiedResults.forEach(e => {
      Mdate = new Date(e.publishedAt);
      e.publishedAt = '' + Mdate.getFullYear();
    })

    // filter
    if(source == 'all' && date == 'all'){
      return setFilteredResults(dateModifiedResults)
    } else if(source == 'all'){
      let dateFiltered = dateModifiedResults.filter(result => result.publishedAt == date);
      return setFilteredResults(dateFiltered);
    } else if (date == 'all'){
      let sourceFiltered = dateModifiedResults.filter( result => result.source.name == source);
      return setFilteredResults(sourceFiltered)
    } else {
      let dateFiltered = dateModifiedResults.filter(result => result.publishedAt == date);
      let sourceDateFiltered = dateFiltered.filter( result => result.source.name == source);
      return setFilteredResults(sourceDateFiltered);
    }
  }

  return (
    <div className='wrapper'>
      <SearchBar onSearch={searchHandler}/>
      {results.length !== 0 ? (
        <Controls 
        onFilter={filterHandler} 
        onNavigate={navigateHandler} 
        switchPage={switchPage}
        resultsCounter={filteredResults.length}
        wishlistCounter={wishList.length}/>
        ) : null}
      <Results results={switchPage == 0 ? filteredResults : wishList} />
    </div>
  )
}

export default App
