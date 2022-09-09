require('dotenv').config();
const fetch = require("node-fetch");
const { Headers } = fetch;

// == Create a collection with an auto-generated UUID ==
async function createCollection(data){
    // Form the request headers
    const reqHeader = new Headers();
    reqHeader.append("x-client-secret", process.env.API_KEY);
    reqHeader.append("x-project-id", process.env.PROJECT_ID);
    reqHeader.append("Content-Type", "application/json");

    // Form the request body
    const reqBody = JSON.stringify({
        "chain": data.collection_network, // https://docs.crossmint.io/create-and-send-nfts/nft-minting-api
        "metadata": { // https://docs.crossmint.io/create-and-send-nfts/nft-minting-api/metadata
            "name": data.collection_name,
            "description": data.collection_description,
        }
    });

    // Form the request options
    var requestOptions = {
        method: 'POST',
        headers: reqHeader,
        body: reqBody,
        redirect: 'follow'
      };

    // Interpret the response
    let mint_result;
    await fetch(process.env.API_ENDPOINT, requestOptions)
    .then(response => response.json())
    .then(result => mint_result = result)
    .catch(error => console.log('error', error));

    return mint_result;
}

module.exports = { createCollection }

/* 

===== EXAMPLE RESPONSE =====

{
    id: "<UUID>",
    metadata: {
        name: "my collection name",
        description: "my collection description",
    },
    onChain: {
        chain: "polygon",
        type: "erc-721",
    },
};

*/