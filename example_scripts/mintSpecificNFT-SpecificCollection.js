const { createSpecificCollection } = require("../minting_api/collection/createSpecificCollection.js");
const { mintIdempotency } = require("../minting_api/mint/mintIdempotency.js");
const { checkCollectionStatus } = require("../minting_api/status/checkCollectionStatus.js");
const { checkMintStatus } = require("../minting_api/status/checkMintStatus.js");

// Create a unique contract with a unique NFT. 

let collectionInformation = {
    collection_name: "Quickstart Demo",
    collection_description: "Minting a specific NFT id to a specific contract...",
    collection_network: "polygon"
}

let nft = {
    nft_image: "https://i.ibb.co/YfFf9CW/crossmint.webp",
    nft_name: "Example NFT",
    nft_description: "This was generated using the crossmint minting api.",
    nft_recipient: "email:etherohm@protonmail.com:poly",
    nft_tokenId: 1
} 


async function lets_mint(){
    // create the collection
    console.log("Creating (or checking) a contract with the name: " + collectionInformation.collection_name);
    let collection_result = await createSpecificCollection(collectionInformation);
    let collection_status = await checkCollectionStatus(collection_result.id);
    while (!("contractAddress" in collection_status.onChain)){ // make sure contract is created before minting to it....
        console.log("... still working on this ...");
        await new Promise(r => setTimeout(r, 3000));
        collection_status = await checkCollectionStatus(collection_result.id);
    }

    // mint the nft
    console.log(`Minting an NFT to the ${collection_result.id} collection`);
    const mint_response = await mintIdempotency(nft, collection_result.id);
    const crossmint_id = mint_response.id;

    // check mint status
    let mint_status = await checkMintStatus(crossmint_id, collection_result.id);
    while (mint_status.onChain.status == "pending"){
        // lets check again in 3 seconds
        console.log("... still working on this ...");
        await new Promise(r => setTimeout(r, 3000));
        mint_status = await checkMintStatus(crossmint_id, collection_result.id);
    }

    // check for success
    if (mint_status.onChain.status == "success"){
        console.log(`Your NFT was minted to the ${collection_result.id} collection!\n... txId: ` + mint_status.onChain.txId);
    }
    else {
        console.log("There was an issue minting the NFT.")
    }
}

lets_mint();