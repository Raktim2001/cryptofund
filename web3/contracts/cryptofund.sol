// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract cryptofund {
    struct Campaign {
        address owner;
        string title;
        string description;
        string image;
        uint256 target;
        uint256 deadline;
        uint256 raised;
        address[] donators;
        uint256[] donations;
    }
    mapping(uint256 => Campaign) public campaignlist;
    uint256 public ind = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        string memory _image,
        uint256 _deadline,
        uint256 _target
    ) public returns (uint256) {
        require(
            _deadline > block.timestamp,
            "Deadline cannot be in the past, Please enter a date in the future"
        );
        Campaign storage campaign = campaignlist[ind];
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.deadline = _deadline;
        campaign.image = _image;
        campaign.target = _target;

        ind++;
        return ind - 1;
    }

    function donate(uint256 _id) public payable {
        Campaign storage campaign = campaignlist[_id];
        uint256 amt = msg.value;
        campaign.donators.push(msg.sender);
        //campaign.donations.push(amt);
        campaign.donations.push(amt);
        (bool sent, ) = payable(campaign.owner).call{value: amt}("");
        if (sent == true) {
            campaign.raised = campaign.raised + amt;
        }
    }

    function getDonations(uint256 _id)
        public
        view
        returns (address[] memory, uint256[] memory)
    {
        return (campaignlist[_id].donators, campaignlist[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory all = new Campaign[](ind);
        for (uint256 i = 0; i < ind; i++) {
            Campaign storage cur = campaignlist[i];
            all[i] = cur;
        }
        return all;
    }
}
