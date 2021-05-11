//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "hardhat/console.sol";
import "./interfaces/IUniswapV2Router.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "./interfaces/IBalancer.sol";
import "./interfaces/IToken.sol";

struct SwapInfo{
    address  token_address;
    uint percentage; // we need to divide between "100"
    uint amountOut;
}


struct MultipleSwapsInput{
    SwapInfo[] swapInfo;
}

contract SwapperV2 is Initializable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    IUniswapV2Router public uniswapRouter;
    IBRegistry public  balancerRegistry;

    address payable public recipient; // this can be the owner address

    function initialize(address payable _recipient)
        public
        payable
        initializer // this modifier itws provided for the opeZeppeling library
    {

        balancerRegistry = IBRegistry(address(0x7226DaaF09B3972320Db05f5aB81FF38417Dd687)); // balancer dex
        uniswapRouter = IUniswapV2Router(address(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D)); //uniswap dex

        recipient = _recipient; 

    }


    function swap(address to ) payable public {

        uint fee = msg.value.div(1000);
        uint value = msg.value.sub(fee); 

        address[] memory path = new address[](2);
        path[0] = address(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2); // this returns the WETH_address
        path[1] = to; // to = address of the token the user  wants to get for his eth tokens

        uint deadline = block.timestamp.add(3600);

        // 1° Balancer:
        // search the best pools available in the dex

        address[] memory balancer_best_pool_address = 
            balancerRegistry.getBestPoolsWithLimit(
                path[0], 
                path[1],  
                uint(1)  
            ); 

        // console.log(balancer_best_pool_address[0]);

        IBPool balancer_pool = IBPool(balancer_best_pool_address[0]); // i feed my interface with the best pool address to intectact with this pool

        //2° Balancer && Uniswap will check the exchange available for the given token and returns the amountOut in each dex

        // uniswap returns the amount of tokens you will get in the given exchange 
        uint256  amountOutUniswap = uniswapRouter.getAmountsOut(value, path)[1].div(value);

        console.log("amountUniswap");
        console.log(amountOutUniswap);

        // balancer dont do this, but they returns you how many tokens you need from path[0] to buy 1 token of path[1]

        uint TokenPrice = 
            balancer_pool.getSpotPrice(
                path[0],
                path[1]
            );

        uint256 amountOutBalancer = value.div(TokenPrice);

        console.log("amountBalancer");
        console.log(amountOutBalancer);

        //we will choose the best DEX for this excahnge base on witch is the biggest "amounOut{DEX}"

        if( amountOutBalancer < amountOutUniswap ){

            // at this point we wants to exchange WETH for a given token so first we need to buy WETH tokens and then sended to the msg.sender

                TokenInterface fromToken = TokenInterface(path[0]);
                
                fromToken.deposit{value:value}(); 
                fromToken.approve(balancer_best_pool_address[0], value);

                // console.log("Hola");
                // console.log( fromToken.balanceOf(address(this)));

                (uint256 tokenAmountOut, uint256 spotPriceAfter) =
                    balancer_pool.swapExactAmountIn(
                        path[0], //fromToken
                        value,
                        path[1], //toToken
                        amountOutBalancer, // this is the min amountOut of tokens accepted for us after this transaction
                        TokenPrice.add(TokenPrice.div(5)) // the maximun we accept to pay for the tokens (i'm accepting maximun 5% more than the TokenPrice)
                    );

                TokenInterface toToken = TokenInterface(path[1]);
                // console.log(toToken.balanceOf(address(this)));
                toToken.approve(msg.sender, tokenAmountOut);
                toToken.transfer(msg.sender, tokenAmountOut);

        }else{
            uniswapRouter.swapExactETHForTokens{value: value}(
                amountOutUniswap,
                path,
                msg.sender,
                deadline
            );
        }

        payable(recipient).transfer(fee);
    }

    function multipleSwaps(MultipleSwapsInput memory multipleSwapsInfo)payable public {
        
    }

}
