// import type { IAgentRuntime } from '@elizaos/core';

// export type EvmCfg = {
//   rpc: string;
//   pk: `0x${string}`;
//   chainId: number;
// };

// export function loadCfg(runtime: IAgentRuntime): EvmCfg {
//   const s: any = (runtime as any)?.character?.settings?.secrets ?? {};
//   const rpc = process.env.EVM_RPC_URL ?? s.EVM_RPC_URL;
//   const pk  = (process.env.PRIVATE_KEY ?? s.PRIVATE_KEY) as `0x${string}`;
//   const cid = Number(process.env.CHAIN_ID ?? s.CHAIN_ID);
//   if (!rpc || !pk || !cid) throw new Error('Missing EVM config (EVM_RPC_URL/PRIVATE_KEY/CHAIN_ID).');
//   return { rpc, pk, chainId: cid };
// }
