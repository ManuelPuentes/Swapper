
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-truffle5");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */


const INFURA_URL = "https://rinkeby.infura.io/v3/6a6d283c79ea445ebe662091ebaabcc6";
const PRIVATE_KEY  = 'd3d706b604bf327117af42663c0172dc6cb2b3e5f6e365ba94b5bc3bdf37a2a9';



module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby:{
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },

    hardhat: {
      // Uncomment these lines to use mainnet fork
      forking: {
        url: `${process.env.ALCHEMY_KEY}`,
        blockNumber: 12397069,
      },
    },
  }
};

