import React from 'react'
import findPlayerStats from './FindMainStats'
import functiontest from './FindStatsTest'



const SearchResult = ({results}) => {

  const handleClick = () => { 
    functiontest(results)
  }

  return (
    <div className="hover:bg-gray-200 duration-300 hover:cursor-pointer" onClick={handleClick}>
      {results.bungieGlobalDisplayName}#{results.bungieGlobalDisplayNameCode}
    </div>
  )
}

export default SearchResult
