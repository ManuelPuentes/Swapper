import { ethers, Contract } from 'ethers';
import Greeter from './Greeter.json'; //this will be the artifact for this contract

//THIS FILES HAVE ONE RESPONSABILITY, LOAD A CONTRACT ABI AND ADDRESS AN LET THE FRONTEND USER INTERACT WITH AN ESPECIFIC CONTRACT ON THE BLOCKCHAIN

const getGreeterContract = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if(window.ethereum) {

        await window.ethereum.enable(); // this line, requires access for metamask  
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner(0);

        const signerAddress = await signer.getAddress();

        const greeter = new Contract(
          Greeter.address,
          Greeter.abi,
          signer
        );

        resolve({signerAddress, greeter});
      }
      resolve({signerAddress: undefined, token: undefined});
    });
  });

export default getGreeterContract;
