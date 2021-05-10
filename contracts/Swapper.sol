//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "hardhat/console.sol";
import "./interfaces/IUniswapV2Router.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

struct SwapInfo{
    address  token_address;
    uint percentage; // we need to divide between "100"
}


struct MultipleSwapsInput{
    SwapInfo[] swapInfo;
}



contract Swapper is Initializable, OwnableUpgradeable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    IUniswapV2Router internal uniswapRouter;
    address payable public recipient; // this can be the owner address

    function initialize(address payable _recipient)
        public
        payable
        initializer // this modifier itws provided for the opeZeppeling library
    {

      uniswapRouter = IUniswapV2Router(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
      recipient = _recipient; 

    }

    function swap(address to) payable public {
        require(msg.value > 0);

        console.log("sender");
        console.log(msg.sender);

        uint fee = msg.value.div(1000); // fee will be the 0.1% of each tx

        uint amountOut = msg.value.sub(fee); 

        address[] memory path = new address[](2);
        path[0] = uniswapRouter.WETH();
        path[1] = to; // to = address of the token the user  wants to get for his eth tokens

        uint deadline = block.timestamp.add(3600);

        uniswapRouter.swapExactETHForTokens{value: amountOut }( amountOut, path , msg.sender, deadline);

        recipient.transfer(fee);
    }

    function multipleSwaps(MultipleSwapsInput memory multipleSwapsInfo)payable public {
        require(msg.value > 0);
        
        uint fee = msg.value.div(1000); // fee will be the 0.1% of each tx
        uint value = msg.value.sub(fee);

        address[] memory path = new address[](2);
        path[0] = uniswapRouter.WETH();
        
        
        for (uint i = 0 ; i < multipleSwapsInfo.swapInfo.length; i++ ){
            path[1] = multipleSwapsInfo.swapInfo[i].token_address;

            uint amountOut = value.mul(multipleSwapsInfo.swapInfo[i].percentage.div(100));

            uniswapRouter.swapExactETHForTokens{value: amountOut }( amountOut, path, msg.sender, block.timestamp.add(3600));
        }
        
        recipient.transfer(fee);
    }

    

}
