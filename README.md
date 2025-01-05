# CryptoFund

CryptoFund is a decentralized application (dApp) that allows users to create crowdfunding campaigns and contribute to them using Ethereum. This project is built using Solidity for the smart contract and JavaScript/React for the frontend.

## Features

- **Create Campaigns**: Users can create campaigns by specifying details like title, description, image, deadline, and funding target.
- **Contribute to Campaigns**: Users can donate Ether to campaigns and help them reach their funding goals.
- **Track Contributions**: Campaign owners can track the donations made to their campaigns.

## Smart Contract

The `cryptofund.sol` smart contract includes the following functionalities:

- `createCampaign`: Allows the creation of new campaigns with unique IDs.
- `donate`: Allows users to contribute Ether to a specific campaign.
- `getDonations`: Retrieves the list of donors and donation amounts for a specific campaign.

### Tech Stack

- **Frontend**: React.js
- **Backend**: Solidity smart contract deployed on Ethereum
- **Tools**: Hardhat, Node.js

## Project Structure

- **`client/`**: Contains the React.js frontend code.
- **`web3/`**: Contains the Solidity smart contract and configuration for deployment.
- **`artifacts/`**: Generated artifacts from Hardhat.
- **`contracts/cryptofund.sol`**: The main smart contract for the project.

## How to Run

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Hardhat](https://hardhat.org/)
- [Metamask](https://metamask.io/) browser extension for interacting with the Ethereum blockchain.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Raktim2001/cryptofund.git
   cd cryptofund
