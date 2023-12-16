import { useState } from 'react';
import './App.css'

import axios from 'axios';
import SearchBar from './Components/SearchBar/SearchBar';
import Results from './Components/Results/Results';
import Controls from './Components/Controls/Controls';

function App() {
  let [results, setResults] = useState([]);
  let [filterCounter, setFilterCounter] = useState(0);
  let [wishList, setWishList] = useState([]); // wishlist of news
  let [switchPage, setSwitchPage] = useState(0); // search Results or wishlist


  const searchHandler = (searchValues) => {
    let q = searchValues;
    axios.get(`https://newsapi.org/v2/everything?q=${q}&sortBy=relevancy&page=1&pageSize=100&apiKey=0308b0a480b8476ea2db40404f2af7b5`)
    .then(data => {
      let updatedData = [...data.data.articles];
      
      // set initial values for visibility attribute and results counter
      let count = 0;
      updatedData.forEach(article => {
        article.visibility = true;
        count +=1;
      });
      
      // modify date format
      let ModifiedDate;
      updatedData.forEach(article => {
        ModifiedDate = new Date(article.publishedAt);
        article.publishedAt = '' + ModifiedDate.getFullYear();
      })

      setFilterCounter(count)
      setResults(updatedData);
    })
    .catch(err => console.log(err))
  }

  // for navigation between results and wishlist
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

    console.log(typeof source, typeof date)

    // filter results by visibilty
    if(source == 'all' && date == 'all'){
      dateModifiedResults.forEach(result => result.visibility = true);
    } else if(source == 'all'){
      dateModifiedResults.forEach(result => {
        if(result.publishedAt != date) result.visibility = false;
        else result.visibility = true;
      });
    } else if (date == 'all'){
      dateModifiedResults.forEach( result => {
        if(result.source.name != source) result.visibility = false;
        else result.visibility = true; 
      });
    } else {
      dateModifiedResults.forEach(result => {
        if(result.publishedAt != date || result.source.name != source) result.visibility = false;
        else result.visibility = true;
      });
    }

    // count visible results
    let count = 0;
    dateModifiedResults.forEach(result => { if(result.visibility == true) count += 1 });

    setFilterCounter(count)
    setResults(dateModifiedResults);
  }

  const addWishHandler = (index) => {
    // add listed attribute, used in ArticleItem.jsx => to disable add button
    let updatedResults = [...results];
    updatedResults[index].listed = true;
    updatedResults[index].index = index;
    // add item to wishlist
    let newItem = results[index];
    let updatedWishlist = [...wishList, newItem];
    // update state
    setResults(updatedResults);
    setWishList(updatedWishlist);
  }

  const removeWishHandler = (indx, index) => {
    // remove listed attribute, used in ArticleItem.jsx => to active add button
    let updatedResults = [...results];
    updatedResults[index].listed = false;   // (index) represent article place in results list
    // remove item from wishlist
    let updatedWishlist = [...wishList];
    updatedWishlist.splice(indx, 1);        // (indx) represent article place in wish list
    // update state
    setResults(updatedResults);
    setWishList(updatedWishlist);
  }

  return (
    <div className='wrapper'>
      <SearchBar onSearch={searchHandler}/>
      {results.length !== 0 ? (
        <Controls 
        onFilter={filterHandler} 
        onNavigate={navigateHandler} 
        switchPage={switchPage}
        resultsCounter={filterCounter}
        wishlistCounter={wishList.length}/>
        ) : null}
      <Results 
      switchPage={switchPage}
      results={switchPage == 0 ? results : wishList}
      addWish={addWishHandler}
      removeWish={removeWishHandler}/>
    </div>
  )
}

export default App
