import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'
import { MIN_DELAY } from '../helper-hardhat-config'

const deployTimeLock: DeployFunction =async (
  hre: HardhatRuntimeEnvironment
) => {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log('Deploying Timelock...')
  
  const timeLock = await deploy('TimeLock', {
    from: deployer,
    args: [MIN_DELAY, [], []],
    log: true,
    // waitConfirmations
  })
  // log('Deployed Timelock ....!')
}

export default deployTimeLock;