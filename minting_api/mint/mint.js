require('dotenv').config();
const fetch = require("node-fetch");
const { Headers } = fetch;

// == Mints an NFT with given data==
// data, collectionName (default if none provided) -> JSON response
async function mint(data, collectionName = "default"){
    // Form the request headers
    const reqHeader = new Headers();
    reqHeader.append("x-client-secret", process.env.API_KEY);
    reqHeader.append("x-project-id", process.env.PROJECT_ID);
    reqHeader.append("Content-Type", "application/json");
    // Form the request body
    const reqBody = JSON.stringify({
        "mainnet": false, // mainnet flag, use false for testnets
        "metadata": {
            "name": data.nft_name,
            "image": data.nft_image,
            "description": data.nft_description
            // ... + whatever other metadata you'd like, please check https://docs.crossmint.io/create-and-send-nfts/nft-minting-api/metadata
        },
        "recipient": data.nft_recipient
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
    await fetch(process.env.API_ENDPOINT + `/default/nfts/`, requestOptions)
    .then(response => response.json())
    .then(result => mint_result = result)
    .catch(error => console.log('error', error));

    return mint_result;
}

module.exports = { mint }

/* 

===== EXAMPLE RESPONSE =====

{
    id: crossmint_nft_id,
    onChain: {
        status: "pending",
        txId: "0x43ebb89f469eb42a4ce3c8618936e298282ad0aaa029d62d7edd64e0939cff32",
        contractAddress: "0x9d8ec1B63413994ee6bd7A15953Dd0ECc6061a7b",
        chain: "polygon",
    },
};

*/
