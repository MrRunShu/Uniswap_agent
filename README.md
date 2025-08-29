- # Uni Agent – ElizaOS Project

  This repository contains an **ElizaOS agent** with an EVM (Ethereum-compatible) plugin.
   The goal is to run an AI agent that can interact with blockchains (e.g. Base, Ethereum, Polygon) through natural language — for example, querying balances or sending testnet transactions.

  ------

  ## 🚀 Prerequisites

  Before running the project, install the following:

  - **Node.js** (>=18, recommended: 20 LTS) → [Download here](https://nodejs.org/en/download)

  - **pnpm** (package manager)

    ```bash
    corepack enable
    corepack prepare pnpm@latest --activate
    # Or: npm install -g pnpm
    ```

  ------

  ## ⚙️ Configuration

  1. Create a `.env` file in the project root (copy from `.env.example` if available).

  2. Add your environment variables.
      Minimal example for **Base Sepolia testnet**:

     ```env
     # openai key
     OPENAI_API_KEY=
     
     # Dtabase
     PGLITE_DATA_DIR=.\.eliza\.elizadb
     CHARACTERS_DIR=.\src\characters
     
     # Wallet
     EVM_PRIVATE_KEY=
     
     # Base Mainnet
     ETHEREUM_PROVIDER_BASE=https://mainnet.base.org
     CHAIN_ID_BASE=8453
     # Base
     WETH=0x4200000000000000000000000000000000000006
     UNIVERSAL_ROUTER=0x2626664c2603336E57B271c5C0b26F421741e481
     NONFUNGIBLE_POSITION_MANAGER=0xFcb8Aa49bB9f4f8eBc5c7d9c0C301e9F1e0D3fA8
     QUOTER_V2=0x6e2C79eEAd9bD0A50dbf61Ff3D60D6a656bcfC0b
     
     # Base Sepolia Testnet
     ETHEREUM_PROVIDER_BASESEPOLIA=https://sepolia.base.org
     CHAIN_ID_BASESEPOLIA=84532
     # Base Sepolia
     WETH_SEPOLIA=0x4200000000000000000000000000000000000006
     ```

  ⚠️ **Important:**

  - Do **NOT** use your mainnet private key. Create a fresh testnet wallet.
  - Use a faucet to claim some Base Sepolia ETH for testing.

  ------

  ## ▶️ Running the Agent

  Start the agent with your character configuration:

  ```bash
  pnpm start --character ./src/characters/cryptohead.json
  ```

  If you need to build first:

  ```bash
  pnpm build
  pnpm start --character ./src/characters/cryptohead.json
  ```

  
