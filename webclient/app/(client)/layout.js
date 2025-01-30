"use client";

import Nav from "@/components/ui/Nav";
import { MetaMaskProvider } from "@metamask/sdk-react";

export default function RootLayout({ children }) {
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
      <MetaMaskProvider sdkOptions={sdkOptions} debug={false}>
         <div>
            <Nav />
            <div className="text-slate-900 dark:text-white bg-slate-300/50 dark:bg-primary">
               <div className="container pb-10 min-h-screen">{children}</div>
            </div>
         </div>
      </MetaMaskProvider>
   );
}
