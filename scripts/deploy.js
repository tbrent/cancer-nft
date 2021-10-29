const hre = require("hardhat")

const { BigNumber } = require("ethers")

const networkConfig = {
    default: {
        name: "hardhat",
    },
    31337: {
        name: "localhost",
    },
    3: {
        name: "ropsten",
    },
    1: {
        name: "mainnet",
    },
}

// getChainId: Returns current chain Id
const getChainId = async (hre) => {
    let _chainId
    try {
        _chainId = await hre.network.provider.send("eth_chainId")
    } catch (e) {
        console.log("failed to get chainId, falling back on net_version...")
        _chainId = await hre.network.provider.send("net_version")
    }

    if (!_chainId) {
        throw new Error(`could not get chainId from network`)
    }
    if (_chainId.startsWith("0x")) {
        _chainId = BigNumber.from(_chainId).toString()
    }
    return _chainId
}

async function main() {
    const [deployer] = await hre.ethers.getSigners()
    const chainId = await getChainId(hre)

    // Check if chain is supported
    if (!networkConfig[chainId]) {
        throw new Error(`Missing network configuration for ${hre.network.name}`)
    }

    console.log(`Starting full deployment on network ${hre.network.name} (${chainId})`)
    console.log(`Deployer account: ${deployer.address}\n`)
    return
    /********************** Deploy RSR ****************************************/
    const NFT = await hre.ethers.getContractFactory("Cancer NFT")
    const nft = await NFT.connect(deployer).deploy("Cancer NFT", "CNFT")

    console.log(`NFT deployed at address: ${nft.address} on network ${hre.network.name} (${chainId}).`)
    console.log(`Tx: ${nft.deployTransaction.hash}\n`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

// TO verify: `npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"``
