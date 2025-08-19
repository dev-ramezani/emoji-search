import React, { useCallback, useEffect, useState } from 'react';
import emojiList from './emojiList.json';
import './App.css';

function App(){
  const [pageCount,setPageCount] = useState(0);
  const [activePage,setActivePage] = useState(1);
  const [searchedArray,setSearchedArray] = useState(emojiList);
  const [searchString,setSearchString] = useState("");

  const pageManager = () => {
    if( searchedArray.length % 28 > 0 ){ return parseInt( searchedArray.length / 28 + 1) }
    else{ return parseInt( searchedArray.length / 28 ) }
  }

  const handlePage = useCallback((pageNumber) => {
    setActivePage(pageNumber)
  },[])

  useEffect(() => {
    if (searchString.length === 0 ){
      setSearchedArray(emojiList) }
    else{
      const searchedObjects = []
      emojiList.forEach((Item) => {
          if(Item.title.toLowerCase().includes(searchString.toLowerCase())){
            searchedObjects.push(Item);}
          else if(Item.keywords.toLowerCase().includes(searchString.toLowerCase())){
            searchedObjects.push(Item);}
      })
      setSearchedArray(searchedObjects)
    }
  },[searchString])

  useEffect(() => {
    setPageCount(pageManager())
  },[searchedArray])

  return (
    <div className="App">
      <input className='search' value={searchString} placeholder='Search Here' onChange={(e) => setSearchString(e.target.value)} ></input>
      <ul className='list'>
      {searchedArray.slice( 28 * ( activePage - 1 ) , 28 * activePage ).map((item,index) => (
        <li key={index} className='item'>
          <h1 className='title'>{item.title}</h1>
          <span>{item.symbol}</span>
        </li>
      ))}
      </ul>
      <ul className='pageManger'>
        { new Array(pageCount).fill(0).map((_,index) => (
          <li key={index} className='partiation'>
            <button className={ activePage === index + 1 ? 'active' : 'normal' } onClick={ () => handlePage( index + 1 ) }>{index+1}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;