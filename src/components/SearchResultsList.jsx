import React from 'react'
import SearchResult from './SearchResult'

const SearchResultsList = ({results}) => {
  return (
    <div className="flex bg-white flex-col shadow-lg w-7/12 m-5 rounded-lg">
        {
            results.map((results, id) =>{
                return <SearchResult results = {results} key={id}/>
            })
        }
    </div>
  )
}

export default SearchResultsList
