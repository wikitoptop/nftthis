/** Replace the values below with the addresses of your smart contracts. */

// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.
import { BinanceTestnet } from "@thirdweb-dev/chains";
export const NETWORK = BinanceTestnet;

// 2. The address of the marketplace V3 smart contract.
// Deploy your own: https://thirdweb.com/thirdweb.eth/MarketplaceV3
// export const MARKETPLACE_ADDRESS = "0xfB1acEbf353ED21E928F0E02BD40C9D4746b1Bd0";
export const MARKETPLACE_ADDRESS = "0xC49e68730F331f484bB8B0c29F2141de5d03e31E";
// 3. The address of your NFT collection smart contract.
// export const NFT_COLLECTION_ADDRESS =
//   "0x851D76e3f080ba61692328df41479EC2acE9236D";
export const NFT_COLLECTION_ADDRESS =
  "0xbD0c4035B4097a46b696c7840c2C29e8FD7A8FcD";
// (Optional) Set up the URL of where users can view transactions on
// For example, below, we use Mumbai.polygonscan to view transactions on the Mumbai testnet.
export const ETHERSCAN_URL = "https://testnet.bscscan.com";
