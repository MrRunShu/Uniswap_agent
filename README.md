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

  - **Git** (to clone the repository)

  👉 **Bun is NOT required**. We use Node.js + pnpm.

  ------

  ## 📦 Installation

  Clone the repository and install dependencies:

  ```bash
  git clone <your-repo-url>
  cd uni_agent
  pnpm install
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
     PGLITE_DATA_DIR=.\elizabeth\uni_agent\.eliza\.elizadb
     CHARACTERS_DIR=.\elizabeth\uni_agent\src\characters
     
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

  ------

  ## 💬 Example Commands

  Once the agent is running, you can interact using natural language prompts such as:

  - **“Check my wallet address.”**
  - **“What is my balance?”**
  - **“Send 0.001 ETH to 0x123... on Base Sepolia.”**

  By default, the agent may ask for confirmation multiple times before executing a transaction (safety feature). This can be tuned in the character or plugin configuration.

  ------

  ## 🛠 Common Issues

  - **`'node' is not recognized` (Windows)** → Node.js not added to PATH. Reinstall Node.js and restart terminal.
  - **Character validation failed** → Check JSON in `cryptohead.json` (ensure `name`, `plugins`, `systemPrompt` are valid).
  - **Insufficient funds** → Faucet required for testnet ETH.
  - **Invalid private key** → Must start with `0x` and match your wallet address.

  ------

  ## 🤝 Team Workflow

  - Share `.env.example` instead of real `.env` (never commit secrets).

  - Each teammate uses their own wallet and RPC key.

  - Scripts in `package.json` for consistency:

    ```json
    {
      "scripts": {
        "start": "elizaos start --character ./src/characters/cryptohead.json",
        "build": "tsc --noEmit && vite build && tsup"
      }
    }
    ```

  ------

  ## ✅ Quick Checklist

  -  Node.js 18+ and pnpm installed
  -  `.env` configured with testnet wallet + RPC
  -  `pnpm install` runs without errors
  -  Agent starts with `pnpm start`
  -  Balance query works
  -  Testnet transfer succeeds
