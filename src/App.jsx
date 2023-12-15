import { useState } from 'react';
import './App.css'

import axios from 'axios';
import SearchBar from './Components/SearchBar/SearchBar';
import Results from './Components/Results/Results';
import Controls from './Components/Controls/Controls';

function App() {
  const [count, setCount] = useState(0);
  let [results, setResults] = useState([]);
  let [filteredResults, setFilteredResults] = useState([]);

  const searchHandler = (searchValues) => {
    let q = searchValues;
    axios.get(`https://newsapi.org/v2/everything?q=${q}&sortBy=relevancy&page=1&pageSize=10&apiKey=0308b0a480b8476ea2db40404f2af7b5`)
    .then(data => {
      setResults(data.data.articles);
      setFilteredResults(data.data.articles)
    })
    .catch(err => console.log(err))
  }

  const filterHandler = (source, date) => {
    let dateModifiedResults = [...results];
    let Mdate;
    
    // change date format
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
      {results.length !== 0 ? <Controls onFilter={filterHandler} counter={filteredResults.length}/> : null}
      <Results results={filteredResults} />
    </div>
  )
}

export default App
