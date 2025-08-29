// export type UniAddresses = {
//   UNIVERSAL_ROUTER: `0x${string}`;
//   SWAP_ROUTER_02: `0x${string}`;
//   QUOTER_V2: `0x${string}`;
//   NPM: `0x${string}`;
//   WETH: `0x${string}`;
// };

// const DEFAULTS: Record<number, UniAddresses> = {
//   11155111: {
//     UNIVERSAL_ROUTER: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
//     SWAP_ROUTER_02:   '0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E',
//     QUOTER_V2:        '0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3',
//     NPM:              '0x1238536071E1c677A632429e3655c799b22cDA52',
//     WETH:             '0xfff9976782d46cc05630d1f6ebab18b2324d6b14'
//   }
// };

// export function getUniAddresses(chainId: number): UniAddresses {
//   const base = DEFAULTS[chainId];
//   if (!base) throw new Error(`No default Uniswap addresses for chainId=${chainId}`);
//   return {
//     UNIVERSAL_ROUTER: (process.env.UNI_UR as `0x${string}`) ?? base.UNIVERSAL_ROUTER,
//     SWAP_ROUTER_02:   (process.env.UNI_SR as `0x${string}`) ?? base.SWAP_ROUTER_02,
//     QUOTER_V2:        (process.env.UNI_QUOTER as `0x${string}`) ?? base.QUOTER_V2,
//     NPM:              (process.env.UNI_NPM as `0x${string}`) ?? base.NPM,
//     WETH:             (process.env.UNI_WETH as `0x${string}`) ?? base.WETH
//   };
// }
