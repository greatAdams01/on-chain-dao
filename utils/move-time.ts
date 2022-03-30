import { network } from "hardhat"

export const moveTime = async (amount:number) => {
  console.log('Moving time')
  await network.provider.send('increaseTime', [amount])
  console.log(`Move forward ${amount} seconds`)
}