import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE } from '../helper-hardhat-config'

const deployGovernorContract: DeployFunction =async (
  hre: HardhatRuntimeEnvironment
) => {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const governaceToken = await get('GovernanceToken')
  const timeLock = await get('TimeLock')
  log('Deploying Governor...')
  const governorContract = await deploy('GovernorContract', {
    from: deployer,
    args: [
      governaceToken.address,
      timeLock.address,
      VOTING_DELAY,
      VOTING_PERIOD,
      QUORUM_PERCENTAGE
    ],
    log: true,
    // waitConfirmations
  })
}

export default deployGovernorContract;