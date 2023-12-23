// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
import "@openzeppelin/contracts@4.8.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.8.0/metatx/ERC2771Context.sol";

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Gardening is ERC2771Context {
    ERC721 NFTZen = ERC721(0xa633722E673A2be31cBB95E202dc5EA2F847292a);
    address TRUSTEDFORWADER = 0xB7B46474aAA2729e07EEC90596cdD9772b29Ecfb;

    uint256[336][9] public grid;


    constructor() ERC2771Context(TRUSTEDFORWADER) {}

    function _msgData() internal view override(ERC2771Context) returns (bytes calldata) {
        return ERC2771Context._msgData();
    }

    // Use internal _msgSender() instead of msg.sender for meta transactions
    function _msgSender() internal view override(ERC2771Context) returns (address sender) {
        return ERC2771Context._msgSender();
    }

    // Function to set a value in the 2D array
    function plant(uint16 zone, uint16 row, uint16 col) public {
        require(row < 15, "Row index out of bounds");
        require(row > 0, "Row index out of bounds");
        require(col < 25, "Column index out of bounds");
        require(col > 0, "Column index out of bounds");

        uint256 balance = NFTZen.balanceOf(_msgSender());
        require(balance > 0, "User must own an NFT");

        setValue(zone, row, col, block.timestamp);
    }

    // Function to set a value in the 2D array
    function dig(uint16 zone, uint16 row, uint16 col) public {
        require(row < 15, "Row index out of bounds");
        require(row > 0, "Row index out of bounds");
        require(col < 25, "Column index out of bounds");
        require(col > 0, "Column index out of bounds");

        uint256 balance = NFTZen.balanceOf(_msgSender());
        require(balance > 0, "User must own an NFT");

        if(getValue(zone,row,col)==1){
            setValue(zone,row,col,0);
        }else{
            setValue(zone,row,col,1);
        }
    }

        // Function to set a value in the 2D array
    function setValue(uint16 zone, uint16 row, uint16 col, uint256 value) private {
        uint index = (24*(row-1)+col)-1;
        grid[zone-1][index]=value;
    }


    // Function to get a value from the 2D array
    function getValue(uint16 zone, uint16 row, uint16 col) public view returns (uint256) {
        require(row < 15, "Row index out of bounds");
        require(col < 25, "Column index out of bounds");
        uint index = (24*(row-1)+col)-1;

        return grid[zone-1][index];
    }

    // // Function to get a value from the 2D array
    function getZone(uint16 zone) public view returns (uint256[336] memory) {
        require(zone > 0, "Zone index out of bounds");
        require(zone < 10, "Zone index out of bounds");

        return grid[zone-1];
    }
}