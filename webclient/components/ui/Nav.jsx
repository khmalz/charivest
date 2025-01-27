"use client";

import React from "react";
import { Button, DarkThemeToggle, Navbar, Popover } from "flowbite-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Nav() {
   const navLink = [
      { text: "Home", link: "/" },
      { text: "Contact", link: "/#contact" },
      { text: "Campaign", link: "/campaign" },
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
      <Navbar fluid theme={"dark"} className="fixed start-0 top-0 z-20 w-full bg-white bg-opacity-5 shadow-sm backdrop-blur-sm py-3 md:py-5 md:!px-[5rem]">
         <Navbar.Brand>
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Flowbite React</span>
         </Navbar.Brand>
         <div className="flex md:order-2">
            <Popover content={contentPopover} trigger="hover">
               <DarkThemeToggle />
            </Popover>

            <Button size="sm" className="!text-white dark:bg-amber-700 dark:hover:!bg-amber-800 md:ml-2">
               Connect with E-wallet
            </Button>
            <Navbar.Toggle className="dark:!text-white hover:bg-opacity-5" />
         </div>
         <Navbar.Collapse>
            {navLink.map((item, index) => (
               <Navbar.Link as={Link} href={item.link} key={index} className={`${pathname == item.link && "active"} hover:bg-opacity-5 md:hover-underline md:text-lg capitalize`}>
                  {item.text}
               </Navbar.Link>
            ))}
         </Navbar.Collapse>
      </Navbar>
   );
}
