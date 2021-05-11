// const { expect } = require("chai");
// const { ethers, upgrades, artifacts } = require("hardhat");

// const IERC20 = artifacts.require("IERC20.sol");
// const IUniswapV2Router02 = artifacts.require("IUniswapV2Router");




// const { web3 } = require('@openzeppelin/test-helpers/src/setup');

// // const { time } = require("@openzeppelin/test-helpers");


// const UNI_ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
// const WETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
// const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
// const USDT_ADDRESS = "0xdac17f958d2ee523a2206206994597c13d831ec7";



// describe("Swapper", () => {

//   let owner, agent_2, swapper, uniswap;

//   beforeEach(async function () {
  
//     [owner, agent_2] = await ethers.getSigners();
//     const Swapper = await ethers.getContractFactory("Swapper");
  
//     swapper = await upgrades.deployProxy(Swapper, [owner.address]);
//     await swapper.deployed();

//     uniswap = await IUniswapV2Router02.at(UNI_ROUTER);

//   });


//   describe("swapper tests", ()=>{

//     it("swap ETH for USDT", async function () {
      
//       const usdtToken = await IERC20.at(USDT_ADDRESS);
//       const prev_balance = await usdtToken.balanceOf(owner.address);

//       const ether = parseInt(web3.utils.toWei("100"));
//       const amountOutUsdt = await uniswap.getAmountsOut(String( ether ), [WETH_ADDRESS, USDT_ADDRESS]);

//       const tx = await swapper.swap(
//         USDT_ADDRESS,
//         String(amountOutUsdt[1]),
//         { from: owner.address, value: web3.utils.toWei("100") }
//       );

//       const post_balance = await usdtToken.balanceOf(owner.address);

//       console.log(`the prev_balance of DAI tokens ${prev_balance}`);
//       console.log(`the post_balance of DAI tokens ${post_balance}`);

//     });

//     it("Several swaps tests", async function () {

//       const daiToken = await IERC20.at(DAI_ADDRESS);
//       const usdtToken = await IERC20.at(USDT_ADDRESS);

//       const prev_balance_dai = await daiToken.balanceOf(owner.address);
//       const prev_balance_usdt = await usdtToken.balanceOf(owner.address);


//       const ether = (parseInt(web3.utils.toWei("100")) * 50)/100;

//       const amountOutUsdt = await uniswap.getAmountsOut(String( ether ), [WETH_ADDRESS, USDT_ADDRESS]);
//       const amountOutDai = await uniswap.getAmountsOut (String( ether ), [WETH_ADDRESS, DAI_ADDRESS]);

//       const tx = await swapper.multipleSwaps({

//         swapInfo: [
//           { token_address: DAI_ADDRESS, percentage : 50, amountOut: String(amountOutDai[1]) },
//           { token_address: USDT_ADDRESS, percentage : 50, amountOut: String(amountOutUsdt[1]) }
//         ]

//       },
//       { from: owner.address, value: web3.utils.toWei("100") }
//       );

//       const post_balance_dai = await daiToken.balanceOf(owner.address);
//       const post_balance_usdt = await usdtToken.balanceOf(owner.address);

//       console.log(`the prev_balance of DAI tokens ${prev_balance_dai}`);
//       console.log(`the post_balance of DAI tokens ${post_balance_dai}`);


//       console.log(`the prev_balance of USDT tokens ${prev_balance_usdt}`);
//       console.log(`the post_balance of USDT tokens ${post_balance_usdt}`);

//     });


//   })
  


// });
