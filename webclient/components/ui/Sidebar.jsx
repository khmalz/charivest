"use client";

import { Button, Sidebar } from "flowbite-react";
import { X } from "lucide-react";
import { HiArrowSmLeft, HiUser, HiViewBoards } from "react-icons/hi";
import { useDrawer } from "../hooks/useDrawer";
import { usePathname } from "next/navigation";
import Link from "next/link";

function contentSidebar() {
   const sideLink = [
      {
         title: "Profile",
         url: "/dashboard/profile",
         icon: HiUser,
      },
      {
         title: "Campaign",
         url: "/dashboard/campaign",
         icon: HiViewBoards,
      },
   ];

   const pathname = usePathname();

   return (
      <>
         <Sidebar.Items>
            <Sidebar.ItemGroup>
               {sideLink.map((item, index) => (
                  <Sidebar.Item as={Link} key={index} href={item.url} active={pathname == item.url} className="rounded-lg" icon={item.icon}>
                     {item.title}
                  </Sidebar.Item>
               ))}
               <Sidebar.Item href="#" icon={HiArrowSmLeft}>
                  Logout
               </Sidebar.Item>
            </Sidebar.ItemGroup>
         </Sidebar.Items>
      </>
   );
}

const sidebarTheme = {
   root: {
      inner: "h-full overflow-y-auto overflow-x-hidden rounded bg-slate-200 shadow-lg dark:shadow-slate-900 px-3 py-4 dark:bg-gray-800",
   },
};

export function SidebarDashboard() {
   return (
      <Sidebar theme={sidebarTheme} aria-label="Sidebar with logo branding" className="md:w-1/5 h-auto min-h-screen hidden md:block bg-slate-200 dark:bg-dashboardprimary">
         <Sidebar.Logo href="#">Charivest</Sidebar.Logo>
         {contentSidebar()}
      </Sidebar>
   );
}

export function DrawerSidebarDashboard() {
   const { toggleDrawer } = useDrawer();

   return (
      <Sidebar aria-label="Sidebar with logo branding" className="block p-0 m-0">
         <div className="flex justify-between items-start">
            <Sidebar.Logo href="#">Charivest</Sidebar.Logo>
            <Button color="light" size="sm" onClick={() => toggleDrawer()} className="w-8 h-8 border-none flex items-center justify-center dark:hover:bg-slate-700 dark:bg-slate-800">
               <X className="w-5" />
            </Button>
         </div>
         {contentSidebar()}
      </Sidebar>
   );
}
