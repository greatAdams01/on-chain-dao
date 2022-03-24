import "hardhat-deploy"
import '@nomiclabs/hardhat-ethers'
import '@typechain/hardhat'
import { HardhatUserConfig } from 'hardhat/config'

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// module.exports = {
//   solidity: "0.8.8",
// };

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat:{
      chainId: 31337
    },
    localhost: {
      chainId: 31337
    }
  },
  solidity: "0.8.8",
  namedAccounts: {
    deployer: {
      default: 0,
    }
  }
}

export default config;