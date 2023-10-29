// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./CredentialToken.sol";

contract GigMarketplace is Ownable, Pausable, CredentialToken {
	enum GigStatus {
		Available,
		Accepted,
		Finished,
		Approved
	}

	struct Gig {
		uint256 id;
		address creator;
		address freelancer;
		string title;
		string description;
		string timeline;
		uint256 reward;
		GigStatus status;
	}

	mapping(uint256 => Gig) public gigs;
	uint256 public totalGigs;

	event GigCreated(
		uint256 indexed gigId,
		address indexed creator,
		string title,
		string description,
		string timeline,
		uint256 reward
	);
	event GigAccepted(uint256 indexed gigId, address indexed freelancer);
	event GigFinished(uint256 indexed gigId);
	event GigApproved(uint256 indexed gigId);

	error InvalidGigId();
	error InvalidStatusTransition();
	error NotGigCreator();

	function createGig(
		string memory title,
		string memory description,
		string memory timeline,
		uint256 reward
	) public whenNotPaused {
		uint256 gigId = ++totalGigs;
		gigs[gigId] = Gig({
			id: gigId,
			creator: msg.sender,
			freelancer: address(0),
			title: title,
			description: description,
			timeline: timeline,
			reward: reward,
			status: GigStatus.Available
		});
		emit GigCreated(
			gigId,
			msg.sender,
			title,
			description,
			timeline,
			reward
		);
	}

	function listGigs() public view returns (Gig[] memory) {
		Gig[] memory allGigs = new Gig[](totalGigs);
		for (uint256 i = 1; i <= totalGigs; i++) {
			allGigs[i - 1] = gigs[i];
		}
		return allGigs;
	}

	function claimAndStartGig(uint256 gigId) public whenNotPaused {
		if (gigId <= 0 || gigId > totalGigs) revert InvalidGigId();
		Gig storage gig = gigs[gigId];
		if (gig.status != GigStatus.Available) revert InvalidStatusTransition();

		gig.freelancer = msg.sender;
		gig.status = GigStatus.Accepted;
		emit GigAccepted(gigId, msg.sender);
	}

	function markGigAsFinished(uint256 gigId) public whenNotPaused {
		if (gigId <= 0 || gigId > totalGigs) revert InvalidGigId();
		Gig storage gig = gigs[gigId];
		if (gig.status != GigStatus.Accepted) revert InvalidStatusTransition();

		gig.status = GigStatus.Finished;
		emit GigFinished(gigId);
	}

	function approveGig(uint256 gigId) public whenNotPaused {
		if (gigId <= 0 || gigId > totalGigs) revert InvalidGigId();
		Gig storage gig = gigs[gigId];
		if (gig.status != GigStatus.Finished) revert InvalidStatusTransition();
		if (gig.creator != msg.sender) revert NotGigCreator();

		// Perform any necessary actions for approving the gig here.

    mint(msg.sender, gigId);
		gig.status = GigStatus.Approved;
		emit GigApproved(gigId);
	}

	function getAllAvailableGigs() public view returns (Gig[] memory) {
		Gig[] memory availableGigs = new Gig[](totalGigs);
		uint256 count = 0;
		for (uint256 i = 1; i <= totalGigs; i++) {
			if (gigs[i].status == GigStatus.Available) {
				availableGigs[count] = gigs[i];
				count++;
			}
		}

		// Create a new array with only the available gigs (excluding any unset elements)
		Gig[] memory result = new Gig[](count);
		for (uint256 j = 0; j < count; j++) {
			result[j] = availableGigs[j];
		}
		return result;
	}

	function getGigById(uint256 gigId) public view returns (Gig memory) {
		require(gigId > 0 && gigId <= totalGigs, "Invalid Gig ID");
		return gigs[gigId];
	}

  function getAllMintedGigTitlesByAddress(address account) public view returns (string[] memory) {
        uint256[] memory gigIds = getAllMintedGigIdsByAddress(account);
        string[] memory gigTitles = new string[](gigIds.length);

        for (uint256 i = 0; i < gigIds.length; i++) {
            Gig storage gig = gigs[gigIds[i]];
            gigTitles[i] = gig.title;
        }

        return gigTitles;
    }

  function getAllMintedGigDescriptionsByAddress(address account) public view returns (string[] memory) {
        uint256[] memory gigIds = getAllMintedGigIdsByAddress(account);
        string[] memory gigDescriptions = new string[](gigIds.length);

        for (uint256 i = 0; i < gigIds.length; i++) {
            Gig storage gig = gigs[gigIds[i]];
            gigDescriptions[i] = gig.description;
        }

        return gigDescriptions;
    }
}
