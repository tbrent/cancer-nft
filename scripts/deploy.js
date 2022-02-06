import * as from from 'tasks'

const hre = require('hardhat')
const { BigNumber } = require('ethers')
// getChainId: Returns current chain Id
const getChainId = async (hre) => {
  let _chainId
  try {
    _chainId = await hre.network.provider.send('eth_chainId')
  } catch (e) {
    console.log('failed to get chainId, falling back on net_version...')
    _chainId = await hre.network.provider.send('net_version')
  }

  if (!_chainId) {
    throw new Error(`could not get chainId from network`)
  }
  if (_chainId.startsWith('0x')) {
    _chainId = BigNumber.from(_chainId).toString()
  }
  return _chainId
}

async function main() {
  const [deployer] = await hre.ethers.getSigners()
  const chainId = await getChainId(hre)

  console.log(`Starting full deployment on network ${hre.network.name} (${chainId})
      with deployer account: ${deployer.address}`)
  const NFT = await hre.ethers.getContractFactory('CancerNFT')

  /********************** Deploy Tier 1 ****************************************/
  const one = await NFT.connect(deployer).deploy('Cancer NFT Tier 1', 'CNFT1', 'test uri 1/')
  await one.deployTransaction.wait()
  console.log(`NFT deployed at address: ${one.address} on network ${hre.network.name} (${chainId}).`)
  console.log(`Tx: ${one.deployTransaction.hash}\n`)

  // /********************** Deploy Tier 2 ****************************************/
  // const two = await NFT.deploy('Cancer NFT Tier 2', 'CNFT2', 'test uri 2/')
  // await two.deployTransaction.wait()
  // console.log(`NFT deployed at address: ${two.address} on network ${hre.network.name} (${chainId}).`)
  // console.log(`Tx: ${two.deployTransaction.hash}\n`)

  // /********************** Deploy Tier 3 ****************************************/
  // const three = await NFT.deploy('Cancer NFT Tier 3', 'CNFT3', 'test uri 3/')
  // await three.deployTransaction.wait()
  // console.log(`NFT deployed at address: ${three.address} on network ${hre.network.name} (${chainId}).`)
  // console.log(`Tx: ${three.deployTransaction.hash}\n`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

// TO verify: `npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"``
