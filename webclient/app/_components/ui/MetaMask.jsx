"use client";

import { MetaMaskProvider } from "@metamask/sdk-react";

export default function MetaMask({ children }) {
   const host = typeof window !== "undefined" ? window.location.host : "defaultHost";
   const sdkOptions = {
      logging: { developerMode: false },
      checkInstallationImmediately: false,
      dappMetadata: {
         name: "Next-Metamask-Boilerplate",
         url: host,
      },
   };

   return (
      <>
         <MetaMaskProvider sdkOptions={sdkOptions} debug={false}>
            {children}
         </MetaMaskProvider>
      </>
   );
}
