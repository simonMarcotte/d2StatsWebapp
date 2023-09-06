import React, {useState} from 'react'
import axios from 'axios';
import file from "./xapikey.json"

function testdummy(results){

    var membershipPlatform = 0;
    var myXapiKey = file.myXapiKey;


    if (Number(results.destinyMemberships[0].crossSaveOverride) === Number(0)){
        var membershipPlatform = results.destinyMemberships[0].membershipType;
    } else {
        var membershipPlatform = results.destinyMemberships[0].crossSaveOverride;
    }

    var currMembership = results.destinyMemberships[0].membershipId;

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
        console.log(response.data.Response.mergedAllCharacters.results.allPvP.allTime.killsDeathsRatio.basic.displayValue);
    })
    .catch((error) => {
        console.log(error.data);
    });
    
};

export default testdummy