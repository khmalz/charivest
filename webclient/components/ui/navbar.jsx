import React from "react";

export default function Navbar() {
   const navLink = [
      { text: "Home", link: "#home" },
      { text: "about", link: "#about" },
      { text: "campaign", link: "#campaign" },
   ];

   return (
      <nav className="fixed start-0 top-0 z-20 w-full bg-white bg-opacity-5 shadow-sm backdrop-blur-sm">
         <div className="container mx-auto">
            <div className="flex items-center justify-between py-6">
               <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
                  <ul className="mt-4 flex flex-col rounded-lg p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0">
                     {navLink.map((item, index) => (
                        <li key={index}>
                           <a href={item.link} className={`hover-underline text-lg capitalize ${index === 0 ? "active" : ""}`}>
                              {item.text}
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </nav>
   );
}
