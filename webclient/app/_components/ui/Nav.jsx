"use client";

import { Button, DarkThemeToggle, Dropdown, Navbar, Popover } from "flowbite-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CircleUser } from "lucide-react";
import { useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";

export default function Nav() {
   const { sdk, connected, connecting } = useSDK();
   const [walletAddress, setWalletAddress] = useState("");
   const [username, setUsername] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

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
         console.info("Error checking session:", error);
      }
   };

   useEffect(() => {
      checkSession();

      if (connecting && !connected) deleteSession();
   }, []);

   const connect = async () => {
      if (!window.ethereum) {
         alert("MetaMask is not installed. Please install it to use this feature.");
         return;
      }

      try {
         setLoading(true);
         const accounts = await sdk?.connect();
         const address = accounts?.[0];

         if (!address) {
            setError("Failed to connect wallet");
            return;
         }

         const response = await fetch("/api/wallet/save", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ address }),
         });

         const data = await response.json();

         if (!response.ok) {
            setError(data.message || "Unknown error occurred");
            return;
         }
         console.log(data);

         const fetchedUsername = data?.username || "Dummy User";
         setUsername(fetchedUsername);

         localStorage.setItem("username", fetchedUsername);
      } catch (err) {
         setError("Failed to connect wallet");
         console.error("Failed to connect wallet:", error);
      } finally {
         setLoading(false);
      }
   };

   const disconnect = async () => {
      if (sdk) {
         sdk.terminate();
         deleteSession();
         localStorage.removeItem("username");

         setWalletAddress(""), setUsername(""), setError(null);
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

   const navLink = [
      { text: "Home", link: "/" },
      { text: "Contact", link: "/#contact" },
      { text: "Campaign", link: "/campaign" },
      { text: "Leaderboard", link: "/leaderboard" },
   ];

   const contentPopover = (
      <div className="w-full text-sm text-gray-500 dark:text-gray-400">
         <div className="px-3 py-2">
            <p>Switch Mode</p>
         </div>
      </div>
   );

   const pathname = usePathname();

   return (
      <Navbar fluid theme={"dark"} className="fixed start-0 top-0 z-20 w-full bg-white bg-opacity-5 shadow dark:shadow-sm backdrop-blur-sm py-3 md:py-5 md:px-8 lg:!px-20">
         <div className="md:flex md:items-center lg:items-start md:space-x-5 lg:space-x-8">
            <Navbar.Brand>
               <span className="self-center whitespace-nowrap text-xl lg:text-2xl font-semibold dark:text-white">Charivest</span>
            </Navbar.Brand>
            <Navbar.Collapse className="hidden lg:flex">
               {navLink.map((item, index) => (
                  <Navbar.Link as={Link} href={item.link} key={index} className={`${pathname == item.link && "active"} hover:bg-opacity-5 md:hover-underline lg:text-lg capitalize`}>
                     {item.text}
                  </Navbar.Link>
               ))}
            </Navbar.Collapse>
         </div>
         <div className={`flex md:order-2 space-x-4 ${!connected && "md:space-x-2"}`}>
            <Popover content={contentPopover} trigger="hover">
               <DarkThemeToggle className="focus:ring-1" />
            </Popover>

            {connected && username ? (
               <Dropdown arrowIcon={false} inline label={<CircleUser className="text-gray-500 dark:text-gray-400" />}>
                  <Dropdown.Header>
                     <span className="block text-sm">{loading ? "Connecting..." : username || walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4)}</span>
                  </Dropdown.Header>
                  <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
                  <Dropdown.Item onClick={disconnect}>Sign out</Dropdown.Item>
               </Dropdown>
            ) : (
               <Button size="xs" isProcessing={loading} onClick={connect} disabled={connecting} className="!text-white dark:bg-amber-700 hidden md:block dark:hover:!bg-amber-800 focus:ring-1 dark:focus:bg-amber-700">
                  <span className="lg:text-sm">Connect with E-wallet</span>
               </Button>
            )}
            <Navbar.Toggle className="dark:!text-gray-400 hover:bg-opacity-5 focus:ring-1" />
         </div>
         <Navbar.Collapse className="md:hidden">
            {navLink.map((item, index) => (
               <Navbar.Link as={Link} href={item.link} key={index} className={`${pathname == item.link && "active"} hover:bg-slate-300/60 rounded-lg md:hover-underline md:text-lg capitalize`}>
                  {item.text}
               </Navbar.Link>
            ))}
            {!(connected && username) && (
               <Button size="sm" isProcessing={loading} onClick={connect} disabled={connecting} className="!text-white dark:bg-amber-700 dark:hover:!bg-amber-800 mt-2 focus:ring-1 dark:focus:bg-amber-700">
                  Connect with E-wallet
               </Button>
            )}
         </Navbar.Collapse>
      </Navbar>
   );
}
