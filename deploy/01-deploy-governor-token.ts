import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'

const deployGovernaceToken: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  // @ts-ignore
  const { getNamedAccounts, deployments } = hre
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log('Deploying Governance token...')
  const governanceToken = await deploy('GovernanceToken', {
    from: deployer,
    args: [],
    log: true,
    // waitConfirmations
  })
  log(`Deployed Governance Token address ${governanceToken.address}`)
  await delegate(governanceToken.address, deployer)
  log('Delegated!')
}

const delegate = async (governanceTokenAddres: string, delegatedAccount: string) => {
  const governanceToken = await ethers.getContractAt('GovernanceToken', governanceTokenAddres)
  const tx = await governanceToken.delegate(delegatedAccount)
  await tx.wait(1)
  console.log(
    `Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`
  )
}

export default deployGovernaceToken;