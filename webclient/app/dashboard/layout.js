"use client";

import { DrawerProvider } from "@/components/hooks/useDrawer";
import DrawerDashboard from "@/components/ui/DrawerDashboard";
import { SidebarDashboard } from "@/components/ui/Sidebar";
import { MetaMaskProvider } from "@metamask/sdk-react";

export default function DashboardLayout({ children }) {
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
         <DrawerProvider>
            <div className="dark:text-white text-slate-900 bg-slate-200 dark:bg-dashboardprimary min-h-screen antialiased">
               <div className="flex">
                  <SidebarDashboard />
                  <div className="flex flex-col w-full">
                     <DrawerDashboard />
                     <div className="py-2 px-4">{children}</div>
                  </div>
               </div>
            </div>
         </DrawerProvider>
      </MetaMaskProvider>
   );
}
