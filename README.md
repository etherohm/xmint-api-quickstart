# Crossmint API Quickstart - NodeJS

Creating NFTs doesn't need to be hard. With Crossmint's Minting API, in one single REST https request you can create and deliver an NFT to a user. You pay for these NFTs with credit card, and it works even if the receiver doesn't have any cryptocurrency or crypto wallet.

**The Crossmint Minting API does all of this under the hood:**
- Deploys an NFT smart contract (supported chains: Polygon ERC721, Solana)
- Handles all cryptocurrency payments so you only need to pay in $, with card or ACH
- Validates and uploads NFT metadata and images/videos/3d assets to decentralized permanent storage
- Mints the NFT
- Deposits the NFT in a user wallet 
- Send NFTs to existing crypto wallets via their public key
- Send NFTs to an email address - we create a custodial wallet on the user's behalf

## Why was this repo made? don't you have docs?

We do, this is just a language-specific supplement intended on getting users going in no time as well as provide some examples! This repo currently supports the following API calls:
- `POST`: Mint NFT
- `POST`: Create Collection
- `PUT`: Mint NFT witn idempotency guarantee
- `PUT`: Create a named collection
- `GET`: Get the status of a mint
- `GET`: Get the details of a collection

## Sounds good so far, how do I set this up?

1. You need to `git clone` this repo
2. You need to run `npm i` to install any dependencies
3. You need to register a Crossmint API key. [click here for a testnet key][testnetkey]
    > please note that main-net keys are provisioned on a case-by-case basis and require a payment method. contact support@crossmint.io to get started.
4. Determine the proper route you will use. At the time of writing, the current testnet API route is `https://www.staging.crossmint.io/api/2022-06-09/minting/collections`
5. Fill out the `.env` file located in the repo root.

## Are there any examples that can help me craft my own code?

Yes. Head over to the `eample_scripts` folder. You can run either of them by launching a terminal session and running `node <filename>.js`

Currently I have 2 examples:
1. `mintSingleNFT-NoCollection.js` - Creates a basic NFT object and mints it to the default crossmint collection. It will then check for a successful mint and inform you. This is the most basic form of invoking our API.
2. `mintSpecificNFT-SpecificCollection.js` - This is a more complex version of the previous example. This script will create a named collection based off of collection object. It will wait until the contract is created and then mint a specific NFT to the contract invoking the idempotency guarantee. Once minted it will let you know it was successful.

# Any other examples? Usecases?

Of course! We had an internal hackathon and created a few tools you can use to craft your own with. Please visit [our example projects][demos] page. Here is a tl;dr: twitter minting bot, discord minting bot, google sheets minting bot and a website that turns your selfie into an NFT!

We had a public hackathon not too long ago where users created websites that let you mint art from a web canvas, send NFT's to people that buy online merchendise, let you scan a QR code to mint and NFT and so much more. Even I participated for fun and made a [script][publichackathon] that would use your Hashlips metadata to auto-mint on a new named collection and then auto-list them for sale on OpenSea. (Only kicker is that polygon was not supported at the time so it was done on a non-supported network...... soon though!!!)

## Parting side note
If you get an issue with the imports, you can either swap them from `const {} = require()` to `"import .. from .."` **OR** downgrade node-fetch... `npm install node-fetch@^2.6.6`

# How can I reach someone real for help with this?

You can always join our [discord][discord] and ask in the product support section or email us at support@crossmint.io

   [testnetkey]: <https://staging.crossmint.io/console/projects>
   [demos]: <https://docs.crossmint.io/create-and-send-nfts/nft-minting-api/example-projects>
   [publichackathon]: <https://github.com/0xEmilio/external-hackathon>
   [discord]: <https://discord.gg/crossmint>

ether0#3333 on discord
etherohm@protonmail.com
