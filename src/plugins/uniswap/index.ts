// import type { Action, ActionResult, HandlerCallback, IAgentRuntime, Memory, Plugin, State } from '@elizaos/core';
// import { createPublicClient, createWalletClient, http, parseUnits } from 'viem';
// import { privateKeyToAccount } from 'viem/accounts';

// import QuoterV2 from '@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json' assert { type: 'json' };
// import SwapRouter02 from '@uniswap/swap-router-contracts/artifacts/contracts/SwapRouter02.sol/SwapRouter02.json' assert { type: 'json' };

// import { loadCfg } from './config';
// import { getUniAddresses } from './addresses';

// // minimal ERC20 ABI for approve
// const ERC20_ABI = [
//   { "constant": false, "inputs": [ { "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "type": "function" }
// ] as const;

// function textOf(message?: Memory): string {
//   const m: any = message || {};
//   return m.content?.text ?? m.inputText ?? '';
// }

// /** approve tokenIn to SwapRouter02 */
// export const uni_approve: Action = {
//   name: 'uni_approve',
//   description: 'Approve ERC20 token to Uniswap SwapRouter02.',
//   validate: async (_rt, message) => /approve/i.test(textOf(message)),
//   handler: async (
//     runtime: IAgentRuntime,
//     message: Memory,
//     _state: State | undefined,
//     params: any,
//     callback: HandlerCallback,
//     _responses: Memory[]
//   ): Promise<ActionResult> => {
//     const { rpc, pk, chainId } = loadCfg(runtime);
//     const ADDR = getUniAddresses(chainId);
//     const { token, amount, decimals = 18 } = params ?? {};
//     const wallet = createWalletClient({ account: privateKeyToAccount(pk), transport: http(rpc) });
//     const amountWei = parseUnits(String(amount), Number(decimals));
//     const txHash = await wallet.writeContract({
//       address: token as `0x${string}`,
//       abi: ERC20_ABI,
//       functionName: 'approve',
//       args: [ADDR.SWAP_ROUTER_02, amountWei],
//       chain: undefined
//     });
//     await callback({
//       text: `Approved ${String(amount)} for router`,
//       actions: ['uni_approve'],
//       source: message.content?.source
//     });
//     return {
//       text: 'Approval transaction submitted',
//       values: { success: true },
//       data: { txHash },
//       success: true
//     };
//   }
// };

// /** quoteExactInputSingle */
// export const uni_quote: Action = {
//   name: 'uni_quote',
//   description: 'Get Uniswap v3 single-pool quote (tokenIn -> tokenOut, fee).',
//   validate: async (_rt, message) => /quote|pricing|价格|报价/i.test(textOf(message)),
//   handler: async (
//     runtime: IAgentRuntime,
//     message: Memory,
//     _state: State | undefined,
//     params: any,
//     callback: HandlerCallback,
//     _responses: Memory[]
//   ): Promise<ActionResult> => {
//     const { rpc, chainId } = loadCfg(runtime);
//     const ADDR = getUniAddresses(chainId);
//     const { tokenIn, tokenOut, amountIn, fee = 3000, decimalsIn = 18 } = params ?? {};
//     const pub = createPublicClient({ transport: http(rpc) });
//     const amountInWei = parseUnits(String(amountIn), Number(decimalsIn));
//     const quoteResult = await pub.readContract({
//       address: ADDR.QUOTER_V2,
//       abi: QuoterV2.abi,
//       functionName: 'quoteExactInputSingle',
//       args: [{ tokenIn, tokenOut, fee, amountIn: amountInWei, sqrtPriceLimitX96: 0n }]
//     });
//     const [amountOut] = quoteResult as readonly [bigint, bigint, number, bigint];
//     await callback({
//       text: `Quoted ${amountOut.toString()}`,
//       actions: ['uni_quote'],
//       source: message.content?.source
//     });
//     return {
//       text: 'Quote retrieved',
//       values: { success: true },
//       data: { amountOut: amountOut.toString() },
//       success: true
//     };
//   }
// };

// /** exactInputSingle swap */
// export const uni_swap_exact_in: Action = {
//   name: 'uni_swap_exact_in',
//   description: 'Swap exact amountIn on Uniswap v3 single-pool (set fee, slippageBps).',
//   validate: async (_rt, message) => /swap|兑换|交换/i.test(textOf(message)),
//   handler: async (
//     runtime: IAgentRuntime,
//     message: Memory,
//     _state: State | undefined,
//     params: any,
//     callback: HandlerCallback,
//     _responses: Memory[]
//   ): Promise<ActionResult> => {
//     const { rpc, pk, chainId } = loadCfg(runtime);
//     const ADDR = getUniAddresses(chainId);
//     const {
//       tokenIn, tokenOut, amountIn,
//       fee = 3000, slippageBps = 50, decimalsIn = 18
//     } = params ?? {};

//     const pub = createPublicClient({ transport: http(rpc) });
//     const wallet = createWalletClient({ account: privateKeyToAccount(pk), transport: http(rpc) });

//     const amountInWei = parseUnits(String(amountIn), Number(decimalsIn));
//     const quoteResult = await pub.readContract({
//       address: ADDR.QUOTER_V2,
//       abi: QuoterV2.abi,
//       functionName: 'quoteExactInputSingle',
//       args: [{ tokenIn, tokenOut, fee, amountIn: amountInWei, sqrtPriceLimitX96: 0n }]
//     });
//     const [quoted] = quoteResult as readonly [bigint, bigint, number, bigint];
//     const minOut = quoted * BigInt(10000 - slippageBps) / 10000n;

//     const txHash = await wallet.writeContract({
//       address: ADDR.SWAP_ROUTER_02,
//       abi: SwapRouter02.abi,
//       functionName: 'exactInputSingle',
//       args: [{
//         tokenIn, tokenOut, fee,
//         recipient: wallet.account!.address as `0x${string}`,
//         deadline: BigInt(Math.floor(Date.now() / 1000) + 600),
//         amountIn: amountInWei,
//         amountOutMinimum: minOut,
//         sqrtPriceLimitX96: 0n
//       }],
//       chain: undefined
//     });

//     await callback({
//       text: 'Swap submitted',
//       actions: ['uni_swap_exact_in'],
//       source: message.content?.source
//     });
//     return {
//       text: 'Swap transaction submitted',
//       values: { success: true },
//       data: { txHash, quoted: quoted.toString(), minOut: minOut.toString() },
//       success: true
//     };
//   }
// };

// const uniswapV3Local: Plugin = {
//   name: 'uniswap-v3-local',
//   description: 'Local Uniswap v3 actions: approve, quote, swap.',
//   actions: [uni_approve, uni_quote, uni_swap_exact_in]
// };

// export default uniswapV3Local;
