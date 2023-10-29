// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract CredentialToken is ERC1155, AccessControl {
	uint256 totalMinted = 0;
  
	mapping(uint256 => uint256) private credential_id_to_gig_id;

	error SoulboundTokenCannotBeTransferred();
	error SoulboundTokenCannotBeApproved();

	constructor() ERC1155("ipfs://") {
	}

	function setURI(string memory newuri) public {
		_setURI(newuri);
	}

	function mint(address account, uint256 gigId) public {
		totalMinted += 1;
		_mint(account, totalMinted, 1, "");
    credential_id_to_gig_id[totalMinted] = gigId;
	}

	// The following functions are overrides required by Solidity.

	function supportsInterface(
		bytes4 interfaceId
	) public view override(ERC1155, AccessControl) returns (bool) {
		return super.supportsInterface(interfaceId);
	}

	function _beforeTokenTransfer(
		address /* operator */,
		address from,
		address /* to */,
		uint256[] memory /* ids */,
		uint256[] memory /* amounts */,
		bytes memory /* data */
	) internal pure override {
		if (from != address(0)) revert SoulboundTokenCannotBeTransferred();
	}

	function getTotalSupply() external view returns (uint256) {
		return totalMinted;
	}

	function setApprovalForAll(
		address /* operator */,
		bool /* approved */
	) public pure override {
		revert SoulboundTokenCannotBeTransferred();
	}

	function getGigTypeById(uint256 id) external view returns (uint256 gigId) {
		return credential_id_to_gig_id[id];
	}

	function getAllMintedGigIdsByAddress(address account) public view returns (uint256[] memory) {
    // Initialize an array to store the gig IDs. The maximum size is totalMinted, but not all tokens might belong to the address.
    uint256[] memory tempGigIds = new uint256[](totalMinted);
    uint256 count = 0;

    for (uint256 i = 1; i <= totalMinted; i++) {
        if (balanceOf(account, i) > 0) {
            // The token with ID `i` belongs to the account, so retrieve the associated gig ID.
            tempGigIds[count] = credential_id_to_gig_id[i];
            count++;
        }
    }

    // Now, we need to create a new array of the exact size to store the result.
    uint256[] memory resultGigIds = new uint256[](count);
    for (uint256 j = 0; j < count; j++) {
        resultGigIds[j] = tempGigIds[j];
    }

    return resultGigIds;
}


}
