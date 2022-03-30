import { ethers, network } from 'hardhat'
import * as fs from 'fs'
import { developmentChains, FUNC, NEW_STORE_VALUE, PROPOSAL_DESCRIPTION, VOTING_DELAY, proposalsFile } from '../helper-hardhat-config'
import { moveBlocks } from '../utils/move-blocks'

export const propose = async (args: any[], functionToCall: string, proposalDescription: string) => {
  const governor = await ethers.getContract('GovernorContract')
  const box = await ethers.getContract('Box')
  const encodedFunctionCall = box.interface.encodeFunctionData(
    functionToCall,
    args
  )
  console.log(`Proposing ${functionToCall} on ${box.address}, with ${args}`)
  console.log(`Proposal Description: \n ${proposalDescription}`)
  const proposeTx = await governor.propose(
    [box.address],
    [0],
    [encodedFunctionCall],
    proposalDescription
  )
  const proposalReciept = await proposeTx.wait(1)

  if(developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_DELAY + 1)
  }

  const proposalId = proposalReciept.events[0].args.proposalId
  console.log(`Proposed with proposal ID:\n  ${proposalId}`)

  const proposalState = await governor.state(proposalId)
  const proposalSnapShot = await governor.proposalSnapshot(proposalId)
  const proposalDeadline = await governor.proposalDeadline(proposalId)

  let proposal = JSON.parse(fs.readFileSync(proposalsFile, 'utf8'))
  proposal[network.config.chainId!.toString()].push(proposalId.toString())
  fs.writeFileSync(proposalsFile, JSON.stringify(proposal))

   // The state of the proposal. 1 is not passed. 0 is passed.
   console.log(`Current Proposal State: ${proposalState}`)
   // What block # the proposal was snapshot
   console.log(`Current Proposal Snapshot: ${proposalSnapShot}`)
   // The block number the proposal voting expires
   console.log(`Current Proposal Deadline: ${proposalDeadline}`)

}

propose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })