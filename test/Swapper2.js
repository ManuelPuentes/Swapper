const { expect } = require("chai");
const { ethers, upgrades, artifacts } = require("hardhat");

const IERC20 = artifacts.require("IERC20.sol");
const IUniswapV2Router02 = artifacts.require("IUniswapV2Router");
const IBRegistry = artifacts.require("IBRegistry");




const { web3 } = require('@openzeppelin/test-helpers/src/setup');

// const { time } = require("@openzeppelin/test-helpers");


const UNI_ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const WETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const USDT_ADDRESS = "0xdac17f958d2ee523a2206206994597c13d831ec7";



describe("SwapperV2", () => {

  let owner, agent_2, swapper, uniswap;

  beforeEach(async function () {
  
    [owner, agent_2] = await ethers.getSigners();
    const SwapperV2 = await ethers.getContractFactory("SwapperV2");
  
    swapper = await upgrades.deployProxy(SwapperV2, [owner.address]);
    await swapper.deployed();

    uniswap = await IUniswapV2Router02.at(UNI_ROUTER);

  });


  describe("swapper tests", ()=>{

    it("swap ETH for USDT", async function () {
      
      const daiToken = await IERC20.at(DAI_ADDRESS);
      const prev_balance = await daiToken.balanceOf(owner.address);

      await swapper.swap(
        DAI_ADDRESS,
        { from: owner.address, value: web3.utils.toWei("1") }
      );

      const post_balance = await daiToken.balanceOf(owner.address);

      //THIS BALANCE WILL HAVE THHE BALANCE OF THE PREV TEST STORAGED 
      console.log(`the prev_balance of DAI tokens ${prev_balance}`);
      console.log(`the post_balance of DAI tokens ${post_balance}`);

    });

    it("Several swaps tests", async function () { });


  })
  


});
