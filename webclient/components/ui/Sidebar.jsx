"use client";

import { Button, Sidebar } from "flowbite-react";
import { X } from "lucide-react";
import { HiClock, HiUser, HiViewBoards, HiViewGrid } from "react-icons/hi";
import { useDrawer } from "../hooks/useDrawer";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { sidebarTheme } from "../theme/flowbiteTheme";

function contentSidebar() {
   const pathname = usePathname();

   return (
      <>
         <Sidebar.Items>
            <Sidebar.ItemGroup>
               <Sidebar.Item as={Link} href="/dashboard" active={pathname == "/dashboard"} className="rounded-lg" icon={HiViewGrid}>
                  Overview
               </Sidebar.Item>
               <Sidebar.Item as={Link} href="/dashboard/profile" active={pathname == "/dashboard/profile"} className="rounded-lg" icon={HiUser}>
                  Profile
               </Sidebar.Item>
               <Sidebar.Item as={Link} href="/dashboard/campaign-history" active={pathname == "/dashboard/campaign-history"} className="rounded-lg" icon={HiClock}>
                  History Campaign
               </Sidebar.Item>
               <Sidebar.Collapse icon={HiViewBoards} label="Campaign">
                  <Sidebar.Item as={Link} href="/dashboard/campaign" active={pathname == "/dashboard/campaign" || (pathname.startsWith("/dashboard/campaign/") && !pathname.includes("/create"))}>
                     List Campaign
                  </Sidebar.Item>
                  <Sidebar.Item as={Link} href="/dashboard/campaign/create" active={pathname == "/dashboard/campaign/create"}>
                     Create Campaign
                  </Sidebar.Item>
               </Sidebar.Collapse>
            </Sidebar.ItemGroup>
         </Sidebar.Items>
      </>
   );
}

export function SidebarDashboard() {
   return (
      <Sidebar theme={sidebarTheme} aria-label="Sidebar with logo branding" className="md:w-1/5 h-auto min-h-screen hidden md:block">
         <Sidebar.Logo href="/" as={Link}>
            Charivest
         </Sidebar.Logo>
         {contentSidebar()}
      </Sidebar>
   );
}

export function DrawerSidebarDashboard() {
   const { toggleDrawer } = useDrawer();

   return (
      <Sidebar aria-label="Sidebar with logo branding" className="block p-0 m-0">
         <div className="flex justify-between items-start">
            <Sidebar.Logo href="/" as={Link}>
               Charivest
            </Sidebar.Logo>
            <Button color="light" size="sm" onClick={() => toggleDrawer()} className="w-8 h-8 border-none flex items-center justify-center dark:hover:bg-slate-700 dark:bg-slate-800">
               <X className="w-5" />
            </Button>
         </div>
         {contentSidebar()}
      </Sidebar>
   );
}
