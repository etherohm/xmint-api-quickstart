# Crossmint Minting API Quickstart Kit

https://docs.crossmint.io/create-and-send-nfts/nft-minting-api/

`minting_api` folder holds the functions that can be called on crossmint. 

Currently this package supports all `GET`, `POST` and `PUT` functions.

`example_scripts` has a couple of scripts that show you how to mint and NFT to a default collection or mint a unique tokenId to a collection. 

Feel free to swap data out and run them. `cd` into the `example_scripts` directory. then `node <filename>.js`

## Side notes...

If you get an issue with the imports, you can either swap them to "import .. from .." or downgrade node-fetch.

Downgrade by running:
`npm install node-fetch@^2.6.6`


ether0#3333