// Hardhat
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require("solidity-coverage");

// Libraries
const assert = require("assert");
const { utils } = require("ethers");

require("dotenv").config();

// @dev Put this in .env
const ALCHEMY_ID = process.env.ALCHEMY_ID;
assert.ok(ALCHEMY_ID, "no Alchemy ID in process.env");

// @dev fill this out
const DEPLOYER_MAINNET = "0xAabB54394E8dd61Dd70897E9c80be8de7C64A895";
const DEPLOYER_PK_MAINNET = process.env.DEPLOYER_PK_MAINNET;
const DEPLOYER_RINKEBY = "0xAabB54394E8dd61Dd70897E9c80be8de7C64A895";
const DEPLOYER_PK_RINKEBY = process.env.DEPLOYER_PK_RINKEBY;

const mainnetAddresses = {
  daiAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  cDaiAddress: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
  daiFaucetAddress: "0x2a1530C4C41db0B0b2bB646CB5Eb1A67b7158667",
  ethFaucetAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
};

const rinkebyAddresses = {};

module.exports = {
  defaultNetwork: "hardhat",
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    maxMethodDiff: 25,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  // hardhat-deploy
  namedAccounts: {
    deployer: {
      default: 0,
      mainnet: DEPLOYER_MAINNET,
      rinkeby: DEPLOYER_RINKEBY,
    },
  },
  networks: {
    hardhat: {
      // Standard config
      // timeout: 150000,
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_ID}`,
        blockNumber: 11712566,
      },
      ...mainnetAddresses,
    },

    mainnet: {
      accounts: DEPLOYER_PK_MAINNET ? [DEPLOYER_PK_MAINNET] : [],
      chainId: 1,
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_ID}`,
      gasPrice: parseInt(utils.parseUnits("1", "gwei")),
      ...mainnetAddresses,
    },

    rinkeby: {
      accounts: DEPLOYER_PK_RINKEBY ? [DEPLOYER_PK_RINKEBY] : [],
      chainId: 4,
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_ID}`,
      gasPrice: parseInt(utils.parseUnits("2", "gwei")),
      ...rinkebyAddresses,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.4.25",
        settings: {
          optimizer: { enabled: process.env.DEBUG ? false : true },
        },
      },
      // {
      //   version: "0.7.4",
      //   settings: {
      //     optimizer: { enabled: process.env.DEBUG ? false : true },
      //   },
      // },
    ],
  },
};