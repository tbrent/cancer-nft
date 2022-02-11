# Cancer NFT

This is a very general NFT implementation to be used by Cancer NFT Inc. to use for their NFT distribution.

## NFT

The NFT is an elastic collection, meaning the owner can mint any number of NFTs before they transfer ownership of the contract away. The tokenURI for each NFT is by default a combination of the defaultURI and its tokenID (index). However, it is also possible to set individual tokenURIs, bypassing this systematic approach. 

In addition the NFT implements ERC-2981 and ERC-165.

## Example Contract Parametrization

- `baseURI`: ipfs://QmaUbNbGsb39EW8QvTUgJvvvHRjH59ABmf3vCGuGegcnp1

## Deployments

### Ropsten

- Tier 1: https://ropsten.etherscan.io/address/0xf53f9ccd698775873317f59fb0ff6f45540248dd#code
- Tier 2: https://ropsten.etherscan.io/address/0x68cf6A4cbb3958221eC5228cEEcad6dF7C9F16C7#code
- Tier 3: https://ropsten.etherscan.io/address/0x05c2cF121c904fE22EaD40B738fDEAe61EdeDEF0

### Rinkeby

- Tier 1: https://rinkeby.etherscan.io/address/0x24eb91af302b802fdb2f917940c618c6e688c171#code

### Mainnet

- Tier 1: https://etherscan.io/address/0x2e55528725c15f8efcb7d75a655ae7fe210fa7ad

