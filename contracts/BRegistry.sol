// //SPDX-License-Identifier: Unlicense
// pragma solidity ^0.8.3;

// import "hardhat/console.sol";

// import "@openzeppelin/contracts/utils/math/Math.sol";
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

// interface IBPool {
//     function getDenormalizedWeight(address token) external view returns(uint256);
//     function getBalance(address token) external view returns(uint256);
//     function getSwapFee() external view returns(uint256);
// }

// interface IBFactory {
//     function isBPool(address b) external view returns (bool);
// }


// interface BRegistry {

//     function getPairInfo(address pool, address fromToken, address destToken) external view returns(uint256 weight1, uint256 weight2, uint256 swapFee);
//     function getPoolsWithLimit(address fromToken, address destToken, uint256 offset, uint256 limit) external view returns(address[] memory result);
//     function getBestPools(address fromToken, address destToken) external view returns(address[] memory pools);
//     function getBestPoolsWithLimit(address fromToken, address destToken, uint256 limit) external view returns(address[] memory pools);

//     // Add and update registry

//     function addPoolPair(address pool, address token1, address token2) external returns(uint256 listed);
//     function addPools(address[] calldata pools, address token1, address token2) external returns(uint256[] memory listed);
//     function sortPools(address[] calldata tokens, uint256 lengthLimit) external;
//     function sortPoolsWithPurge(address[] calldata tokens, uint256 lengthLimit) external;
// }