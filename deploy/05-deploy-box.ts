import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'

const deployBox:DeployFunction = async (
  hre:HardhatRuntimeEnvironment
  ) => {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  
  const box = await deploy('Box', {
    from: deployer,
    args: [],
    log: true
  })

  const timeLock = await ethers.getContract('TimeLock')
  const boxContract = await ethers.getContractAt('Box', box.address)

  const transferOwnerTx = await boxContract.transferOwnership(
    timeLock.address
  )
  await transferOwnerTx.wait(1)
  log('Ownership transfered')
}

export default deployBox;