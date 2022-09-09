require('dotenv').config();
const fetch = require("node-fetch");
const { Headers } = fetch;

// == Checks the status of a Collection ==
// collectionId -> JSON status
async function checkCollectionStatus(collectionId){
    // Form the request headers
    const reqHeader = new Headers();
    reqHeader.append("x-client-secret", process.env.API_KEY);
    reqHeader.append("x-project-id", process.env.PROJECT_ID);
    reqHeader.append("Content-Type", "application/json");

    // Form the request body
    const requestOptions = {
    method: 'GET',
    headers: reqHeader,
    redirect: 'follow'
    };

    // Interpret the response
    let check_result;
    await fetch(`${process.env.API_ENDPOINT}/${collectionId}`, requestOptions)
    .then(response => response.json())
    .then(result => check_result = result)
    .catch(error => console.log('error', error));
    return check_result;
}

module.exports = { checkCollectionStatus }

/*

===== EXAMPLE RESPONSE =====

 {
    id: "<collectionId>",
    metadata: {
        name: "Collection Name",
        description: "Collection Description",
    },
    onChain: {
        chain: "polygon",
        type: "erc-721",
        contractAddress: "address when it is created"
    },
};

*/