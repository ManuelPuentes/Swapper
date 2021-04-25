const fs = require('fs');

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const provider = new HDWalletProvider(
    'barely excess tomato verify diet alarm silent interest obscure resemble dose cable',
    'https://rinkeby.infura.io/v3/6a6d283c79ea445ebe662091ebaabcc6'
);


// THIS DEPLOY SCRIPTS PUBLISH THE CONTRACT ON A BLOCKCHAIN, THE TARGET NETWORK CAN BE ADDED ON THE HARDHAT CONFIG FILE  AND THEN CAN BE DEPLOYED USING THIS COMMAND npx hardhat run scripts/deploy.js --network CUSTOM_NETWORK

// FOR TESTING PURPOSES WE CAN USE THE LOCALNETWORK PROVIDED FOR HARDHAT DEPLOYING THIS CONTRACT FOLLOWING THIS STEPS :

// -npx hardhat node //this bootup the localnetwork on your machine on a default port

// -npx hardhat run scripts/deploy.js --network localhost // this command will deploy the contract on the localnetwork


const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Go to deploy in ', accounts[0]);

    const Greeter = await ethers.getContractFactory("Greeter");

    const greeter = await Greeter.deploy("Hello World");

    console.log(greeter.address);

    const data = {
        address: greeter.address, // this is the address for the deployment of this contract
        abi: JSON.parse(greeter.interface.format('json'))
    };

    fs.writeFileSync('frontend/src/contracts/Greeter.json', JSON.stringify(data));
};


deploy()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });