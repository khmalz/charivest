"use client";

import { Button, DarkThemeToggle, Drawer, Dropdown, Popover } from "flowbite-react";
import { CircleUser } from "lucide-react";
import React from "react";
import { HiMenu } from "react-icons/hi";
import { useDrawer } from "../hooks/useDrawer";
import { DrawerSidebarDashboard, SidebarDashboard } from "./Sidebar";

export default function DrawerDashboard() {
   const { isOpen, toggleDrawer } = useDrawer();

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
                     <span className="block text-sm">Bonnie Green</span>
                  </Dropdown.Header>
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                  <Dropdown.Item>Sign out</Dropdown.Item>
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
