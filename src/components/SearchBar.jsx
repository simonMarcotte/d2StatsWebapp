import React, {useState} from 'react'
import {FaSearch} from "react-icons/fa"
import FindMainStats from './FindMainStats'

const SearchBar = ({setResults}) => {

    const [input, setInput] = useState("")

    const fetchName = (value) => {
        var myHeaders = new Headers();
        myHeaders.append("x-api-key", "541473c5686046429830695643e7fa7f");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        var search = value;
        var flag = false;
        var temp = []
        if (value.includes("#")){
            temp = value.split("#")
            search = temp[0]
            flag = true;
        }

        fetch("https://www.bungie.net/Platform/User/Search/Prefix/" + search + "/0/", requestOptions)
        .then(response => response.json())
        .then((json) => {
            var arr = json.Response.searchResults
            const results = arr.filter((user) => {
                if (flag){
                    return value && user && user.bungieGlobalDisplayName && user.bungieGlobalDisplayName.toLowerCase().includes(search.toLowerCase()) && (String(user.bungieGlobalDisplayNameCode).includes(temp[1]))
                } else{
                
                    return value && user && user.bungieGlobalDisplayName && (user.bungieGlobalDisplayName.toLowerCase() == search.toLowerCase())
                }
            });
            setResults(results)
        })
        .catch(error => console.log('error', error));
    }

    const handleChange = (value) => {
        setInput(value)
        fetchName(value)
    }

    return (
        <div className="bg-white flex items-center shadow-md w-7/12 rounded-md m-4">
        <FaSearch id='search-icon' className="text-blue-500"/>
        <input  placeholder="BungieName#1234..." 
                value={input} 
                onChange={(e) => (handleChange(e.target.value))} 
                className="bg-opacity-0 outline-none text-2xl w-7/12"/>
        <FindMainStats/>
        </div>
       
    )
}

export default SearchBar
