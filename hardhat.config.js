require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

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
    }
  }
};

