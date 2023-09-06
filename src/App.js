import React, { useState } from "react";
import axios from 'axios';
import './App.css';
import file from "./components/xapikey.json"
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SearchResultsList from "./components/SearchResultsList";

function App() {

  const [message, setMessage] = useState('');
  const [kd, killsDeathsRatio] = useState('');
  const [urlAddress, setEmblemUrl] = useState('');
  const [results, setResults] = useState([]);

  var myXapiKey = file.myXapiKey;
 
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const FindBungieName = e => {

    e.preventDefault();

    var code;
    var currentUser;
    let currMembership;
    var membershipPlatform;
    var nameParts = message.split("#");
    var bName = nameParts[0];
    code = nameParts[1];

    const qs = require('qs');
    let data = qs.stringify({});

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://www.bungie.net/Platform/User/Search/Prefix/' + bName + '/0/',
      headers: { 
        'x-api-key': myXapiKey, 
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      
      let results = response.data.Response.searchResults;

      for  (let i = 0; i < results.length; i++){
        currentUser = results[i];
        if (Number(currentUser.bungieGlobalDisplayNameCode) === Number(code)){
          currMembership = results[i].destinyMemberships[0].membershipId;
          console.log("Found the bungie name: " + bName + "#" + currentUser.bungieGlobalDisplayNameCode + ", with membership id: " + currMembership);
          break;
        }
      }

    
      if (Number(currentUser.destinyMemberships[0].crossSaveOverride) === Number(0)){
       
        membershipPlatform = currentUser.destinyMemberships[0].membershipType;
      } else {
       
        membershipPlatform = currentUser.destinyMemberships[0].crossSaveOverride;
      }


      FindPlayerStats(currMembership, membershipPlatform);
      GetCharInfo(currMembership, membershipPlatform)
      

    })
    .catch((error) => {
      console.log(error.data);
    });
    
  }

  const FindPlayerStats = (currMembership, membershipPlatform) => {

    const qs = require('qs');
    let data = qs.stringify({});

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://www.bungie.net/Platform/Destiny2/' + membershipPlatform + '/Account/' + currMembership + '/Stats/',
      headers: { 
        'x-api-key': myXapiKey, 
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      killsDeathsRatio(response.data.Response.mergedAllCharacters.results.allPvP.allTime.killsDeathsRatio.basic.displayValue);
      ;
    })
    .catch((error) => {
      console.log(error.data);
    });
    
  };

  const GetCharInfo = (currMembership, membershipPlatform) => {

    const qs = require('qs');
    let data = qs.stringify({});

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://www.bungie.net//Platform/Destiny2/' + membershipPlatform + '/Profile/' + currMembership + '/?components=200&components=100',
      headers: { 
        'x-api-key': myXapiKey, 
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      console.log(response.data);
      console.log(response.data.Response.profile.data.characterIds[0]);
      var charID = response.data.Response.profile.data.characterIds[0];
      setEmblemUrl('https://www.bungie.net/' + response.data.Response.characters.data[charID].emblemBackgroundPath)
      
      ;
    })
    .catch((error) => {
      console.log(error.data);
    });
    
  };


  return (
    <div>
      <Header/>

      <main>

        <SearchBar setResults = {setResults}/>
        <SearchResultsList results = {results}/>
        
      </main>
    </div>
  );
}

export default App;
/*
<form onSubmit={FindBungieName}>
          <label className="text-black">
            BungieName#1234: 
            <input className="outline rounded-md" type="text" value = {message} onChange={handleChange}/>
          </label>
          <p1 className="bg-gray-400 text-white outline outline-black rounded-md hover:cursor-pointer" type="submit">search</p1>
        </form>
        <img 
          className="bg-opacity-30"
          src={urlAddress}
          alt=""
        />
        <p className="text-black">KD: {kd}</p>
*/
