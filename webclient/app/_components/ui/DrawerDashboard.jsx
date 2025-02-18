"use client";

import { Button, DarkThemeToggle, Drawer, Dropdown, Popover } from "flowbite-react";
import { CircleUser } from "lucide-react";
import React, { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { useDrawer } from "../hooks/useDrawer";
import { DrawerSidebarDashboard } from "./Sidebar";
import { useSDK } from "@metamask/sdk-react";
import { useRouter } from "next/navigation";

export default function DrawerDashboard() {
   const { sdk, connected, connecting } = useSDK();
   const { isOpen, toggleDrawer } = useDrawer();
   const [walletAddress, setWalletAddress] = useState("");
   const [username, setUsername] = useState("");

   const checkSession = async () => {
      if (connecting && !connected) return;

      try {
         const response = await fetch("/api/auth/session", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            next: { revalidate: 3600 },
         });
         const data = await response.json();

         if (!data.isAuth) {
            console.log("User not authenticated");
            setWalletAddress(""), setUsername("");
            return;
         }

         console.log("User authenticated:", data.address);
         setWalletAddress(data.address);

         const savedUsername = localStorage.getItem("username");
         if (savedUsername) setUsername(savedUsername);
      } catch (error) {
         console.error("Error checking session:", error);
      }
   };

   useEffect(() => {
      checkSession();

      if (connecting && !connected) deleteSession();
   }, []);

   const { push, refresh } = useRouter();

   const disconnect = async () => {
      if (sdk) {
         console.log("Disconnecting from MetaMask...");
         sdk.terminate();

         localStorage.removeItem("username");
         deleteSession();
         setWalletAddress(""), setUsername("");

         push("/");
         refresh();
      }
   };

   const deleteSession = async () => {
      try {
         const response = await fetch("/api/wallet/logout", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
         });

         if (!response.ok) {
            console.error("Logout failed:", await response.json());
         }
      } catch (error) {
         console.info("Logout error:", error);
      }
   };

   const contentPopover = (
      <div className="w-full text-sm text-gray-500 dark:text-gray-400">
         <div className="px-3 py-2">
            <p>Switch Mode</p>
         </div>
      </div>
   );

   return (
      <>
         <div className="flex items-center px-4 py-2 shadow-lg justify-between md:justify-end">
            <Button size="sm" color="light" className="md:hidden border-none focus:ring-1 focus:ring-slate-300 bg-transparent hover:bg-slate-500 dark:!bg-dashboardprimary dark:hover:!bg-slate-700" onClick={() => toggleDrawer(true)}>
               <HiMenu className="text-xl" />
            </Button>
            <div className="flex items-center space-x-3">
               <Popover content={contentPopover} trigger="hover">
                  <DarkThemeToggle className="focus:ring-1" />
               </Popover>
               <Dropdown arrowIcon={false} inline label={<CircleUser className="text-gray-500 dark:text-gray-400" />}>
                  <Dropdown.Header>
                     <span className="block text-sm">{username ? username : walletAddress ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4) : "No wallet connected"}</span>
                  </Dropdown.Header>
                  <Dropdown.Item onClick={disconnect}>Sign out</Dropdown.Item>
               </Dropdown>
            </div>
         </div>

         <Drawer open={isOpen} onClose={() => toggleDrawer(false)} className="w-auto">
            <Drawer.Items className="p-0 -m-2">
               <DrawerSidebarDashboard />
            </Drawer.Items>
         </Drawer>
      </>
   );
}
