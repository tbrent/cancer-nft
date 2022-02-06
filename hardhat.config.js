const fs = require('fs')


require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')

const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || ''
const ROPSTEN_RPC_URL = process.env.ROPSTEN_RPC_URL || ''
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || ''
const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY || ''
const MNEMONIC = process.env.MNEMONIC || ''


task(
  'make-metadata',
  "Makes a folder of metadata jsons for a single IPFS folder hash"
)
  .addOptionalParam('hash', 'IPFS path to a folder that contains all the artwork for a tier', undefined)
  .addOptionalParam('number', 'The quantity of NFT artworks in the folder', undefined)
  .addOptionalParam('tag', "A tag such as 'Tier 1'", undefined)
  .setAction(async ({ hash, number, tag }) => {
    if (!hash) throw new Error('Define hash')
    if (!number) throw new Error('Define number')
    if (!tag) throw new Error('Define tag')

    // Ensure dir exists
    fs.existsSync('tmp/' + hash) || fs.mkdirSync('tmp/' + hash)

    // Write metadata files
    for (let i = 0; i < number; i++) {
      const s = '{ "image": "ipfs://' + hash + '/' + i + '", "tag": "' + tag + '"}'

      try{
        fs.writeFileSync('tmp/' + hash + '/' + i, s);
      }catch (e){
          console.log("Cannot write file ", e);
      }
      console.log('Metadata ' + i + ' saved to ' + hash + '/' + i)
    }
  })




// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    ropsten: {
      chainId: 3,
      url: ROPSTEN_RPC_URL,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
    mainnet: {
      chainId: 1,
      url: MAINNET_RPC_URL,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
  solidity: {
    version: '0.8.8',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
}
