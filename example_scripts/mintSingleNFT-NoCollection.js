const { mint } = require("../minting_api/mint/mint.js");
const { checkMintStatus } = require("../minting_api/status/checkMintStatus.js");

// We will mint a random NFT to the default collection contract on polygon mumbai

let nft = {
    nft_image: "https://i.ibb.co/YfFf9CW/crossmint.webp",
    nft_name: "Example NFT",
    nft_description: "This was generated using the crossmint minting api.",
    nft_recipient: "email:etherohm@protonmail.com:poly",
} 

async function lets_mint(){
    // mint
    console.log("Minting an NFT...");
    const mint_response = await mint(nft);
    const crossmint_id = mint_response.id;

    // check
    let mint_status = await checkMintStatus(crossmint_id);
    while (mint_status.onChain.status == "pending"){
        // lets check again in 3 seconds
        console.log("... still working on this ...");
        await new Promise(r => setTimeout(r, 3000));
        mint_status = await checkMintStatus(crossmint_id);
    }

    // check for success
    if (mint_status.onChain.status == "success"){
        console.log("Your NFT was minted to a default collection!\n... txId: " + mint_status.onChain.txId);
    }
    else {
        console.log("There was an issue minting the NFT.")
    }

}

lets_mint();