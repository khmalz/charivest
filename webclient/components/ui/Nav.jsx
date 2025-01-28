"use client";

import { Button, DarkThemeToggle, Dropdown, Navbar, Popover } from "flowbite-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CircleUser } from "lucide-react";

export default function Nav() {
   const isLogin = false;

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
      <Navbar fluid theme={"dark"} className="fixed start-0 top-0 z-20 w-full bg-white bg-opacity-5 shadow dark:shadow-sm backdrop-blur-sm py-3 md:py-5 md:px-8 lg:!px-20">
         <div className="md:flex md:items-center lg:items-start md:space-x-5 lg:space-x-8">
            <Navbar.Brand>
               <span className="self-center whitespace-nowrap text-xl lg:text-2xl font-semibold dark:text-white">Flowbite React</span>
            </Navbar.Brand>
            <Navbar.Collapse className="hidden lg:flex">
               {navLink.map((item, index) => (
                  <Navbar.Link as={Link} href={item.link} key={index} className={`${pathname == item.link && "active"} hover:bg-opacity-5 md:hover-underline lg:text-lg capitalize`}>
                     {item.text}
                  </Navbar.Link>
               ))}
            </Navbar.Collapse>
         </div>
         <div className={`flex md:order-2 space-x-4 ${!isLogin && "md:space-x-2"}`}>
            <Popover content={contentPopover} trigger="hover">
               <DarkThemeToggle className="focus:ring-1" />
            </Popover>

            {isLogin ? (
               <Dropdown arrowIcon={false} inline label={<CircleUser className="text-gray-500 dark:text-gray-400" />}>
                  <Dropdown.Header>
                     <span className="block text-sm">Bonnie Green</span>
                  </Dropdown.Header>
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                  <Dropdown.Item>Sign out</Dropdown.Item>
               </Dropdown>
            ) : (
               <Button size="xs" className="!text-white dark:bg-amber-700 hidden md:block dark:hover:!bg-amber-800">
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
            <Button size="sm" className="!text-white dark:bg-amber-700 dark:hover:!bg-amber-800 mt-2">
               Connect with E-wallet
            </Button>
         </Navbar.Collapse>
      </Navbar>
   );
}
