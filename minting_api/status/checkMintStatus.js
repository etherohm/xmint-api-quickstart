require('dotenv').config();
const fetch = require("node-fetch");
const { Headers } = fetch;

// == Checks the status of a mint ==
// crossmint_request_id, collectionName (default if none) -> JSON status
// crossmint_request_id?! What is this? This is the ID created when minting an NFT.
async function checkMintStatus(crossmint_nft_id, collectionName = "default"){
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
    await fetch(`${process.env.API_ENDPOINT}/${collectionName}/nfts/${crossmint_nft_id}`, requestOptions)
    .then(response => response.json())
    .then(result => check_result = result)
    .catch(error => console.log('error', error));
    return check_result;
}

module.exports = { checkMintStatus }

/*

===== EXAMPLE RESPONSE =====

{
    id: "b6cb7427-f931-45f9-a7f7-90883c90fb83",
    metadata: {
        name: "Crossmint Mint API Test",
        image: "ipfs://bafkreia45gqnwzszgjhuon3clj3vdzmnll44qcf7c3gglmvzx6fgv6fibi",
        description: "Test NFT created by the Crossmint Minting API",
    },
    onChain: {
        status: "success",
        tokenId: 258,
        owner: "0xc6AD904c7573EbbC774521e8C45a7494Ed9F2a8b",
        txId: "0x43ebb89f469eb42a4ce3c8618936e298282ad0aaa029d62d7edd64e0939cff32",
        contractAddress: "0x9d8ec1B63413994ee6bd7A15953Dd0ECc6061a7b",
        chain: "polygon",
    },
};

*/