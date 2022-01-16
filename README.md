# Cancer NFT

This is a very general NFT implementation to be used by Cancer NFT Inc. to use for their NFT distribution.

## NFT

The NFT is an elastic collection, meaning the owner can mint any number of NFTs before they transfer ownership of the contract away. The tokenURI for each NFT is by default a combination of the defaultURI and its tokenID (index). However, it is also possible to set individual tokenURIs, bypassing this systematic approach. This allows easy 

In addition the NFT implements ERC-2981 and ERC-165.

## Deployments

### Ropsten

- Tier 1: https://ropsten.etherscan.io/address/0xf53f9ccd698775873317f59fb0ff6f45540248dd#code
- Tier 2: https://ropsten.etherscan.io/address/0x68cf6A4cbb3958221eC5228cEEcad6dF7C9F16C7#code
- Tier 3: https://ropsten.etherscan.io/address/0x05c2cF121c904fE22EaD40B738fDEAe61EdeDEF0

### Mainnet
TODO
