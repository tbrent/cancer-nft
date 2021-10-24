# PrimeVax CancerNFT

This is a very simple NFT + Payment Splitter implementation for PrimeVax to use for their NFT distribution.

This design leaves configuration of the contracts deferred, to be done through etherscan after deployment, and therefore possibly by another entity. After they are satisfied the deployed contracts are to their liking, they should transfer ownership of both the NFT and Splitter to the zero address.

## NFT

The NFT is an elastic collection, meaning the owner can mint any number of NFTs. The owner can also set the royalty address and amount (suggested).

In addition the NFT implements ERC-2981 and ERC-165.

## Splitter

The splitter is configured as the initial recipient of royalties. Any number of beneficiaries can be set by the owner, and in any proportion. Whenever ETH is transferred to the contract, it will automatically forward this to the list of beneficiaries, weighted by their allocations.
