// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract CredentialToken is ERC1155, AccessControl {
	uint256 totalMinted = 0;
	uint256 public constant length = 3;
	mapping(uint256 => string) private gigs_type;

	error SoulboundTokenCannotBeTransferred();
	error SoulboundTokenCannotBeApproved();

	constructor() ERC1155("ipfs://") {
        gigs_type[0] = 'Copy Writing Gig';
        gigs_type[1] = 'Frontend Development Gig';
        gigs_type[2] = 'Gig';
	}

	function setURI(string memory newuri) public {
		_setURI(newuri);
	}

	function mint(address account, uint256 id, uint256 gigType, uint256 gigId) public {
		_mint(account, gigType, 1, "");
		totalMinted += 1;

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

	function getGigTypeById(uint256 id) external view returns (string memory) {
		return gigs_type[id];
	}

	function getBalancesOf(
		address account,
		uint256 gig_type
	) external view returns (uint256[] memory) {
		uint256[] memory balances = new uint256[](length);
		for (uint256 i = 0; i < length; i++) {
			balances[i] = balanceOf(account, i);
		}
		return balances;
	}
}
