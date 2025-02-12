"use client";

import { isAddressNull } from "@/helpers/utils";
import { initializeContract } from "@/utils/contractUtils";
import { ethers } from "ethers";
import { Button, Progress } from "flowbite-react";
import { BadgeDollarSign, Mail, SmartphoneNfc } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
   const [campaigns, setCampaigns] = useState([]);
   const [isConnected, setIsConnected] = useState(true);

   const getPreviewCampaigns = async () => {
      if (!window.ethereum) {
         alert("MetaMask is not installed. Please install it to use this feature.");
         setIsConnected(false);
         return;
      }

      if (isAddressNull()) {
         setIsConnected(false);
         return;
      } else setIsConnected(true);

      try {
         const { contract } = await initializeContract();

         if (contract) {
            const campaignsData = await contract.getCampaigns();

            if (campaignsData) {
               const filteredData = campaignsData.filter(campaign => !campaign.isCompleted);

               const formattedData = filteredData.map(campaign => ({
                  creator: campaign.creator,
                  title: campaign.title,
                  completed: campaign.isCompleted,
                  description: campaign.description,
                  totalFunds: ethers.formatEther(campaign.totalFunds),
                  totalTarget: ethers.formatEther(campaign.totalTarget),
                  deadline: Number(campaign.deadline) * 1000,
                  photos: campaign.photos,
               }));

               setCampaigns(formattedData);
            }
         }
      } catch (error) {
         console.info("Error getting contract balance:", error);
      }
   };

   useEffect(() => {
      getPreviewCampaigns();
   }, []);

   return (
      <div>
         <section id="home" className="grid min-h-screen grid-cols-1 md:grid-cols-2 items-center">
            <div className="flex flex-col items-center space-y-4 md:items-start md:space-y-2 self-center">
               <div className="py-10">
                  <h1 className="text-center text-3xl font-bold dark:text-white sm:text-4xl md:text-start md:text-5xl lg:text-6xl">Campaign Uenjeh</h1>
               </div>
               <div>
                  <h4 className="text-base font-bold dark:text-white md:text-lg lg:text-xl">
                     <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto omnis consequuntur ullam eveniet nulla recusandae fugit ducimus tempora cum velit!</span>
                  </h4>
               </div>
            </div>
         </section>

         <section id="campaign" className="mt-20 md:mt-0">
            <div className="flex flex-col">
               <h3 className="text-center text-2xl font-bold dark:text-white sm:text-4xl">Campaign List</h3>

               {isConnected ? (
                  <>
                     {campaigns.length > 0 ? (
                        <>
                           <div className="mt-14 grid grid-cols-1 gap-4 mx-auto md:grid-cols-2 xl:grid-cols-3">
                              {campaigns.map((item, index) => (
                                 <div key={index} className="group flex max-w-md flex-col justify-between overflow-hidden rounded-lg dark:bg-slate-700 dark:shadow shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-102">
                                    <div>
                                       <div className="h-52 w-auto overflow-hidden">
                                          <Image width={500} height={500} className="w-full rounded-t-lg" src={item.photos[0]} alt={item.title} />
                                       </div>
                                       <div className="p-5">
                                          <h5 className="text-2xl font-bold capitalize text-slate-900 tracking-tight dark:text-slate-200">{item.title}</h5>
                                          <div className="my-3">
                                             <span className="mr-2 inline-flex cursor-pointer items-center rounded-full bg-primary text-white dark:bg-gray-100 px-2.5 py-0.5 text-xs font-medium dark:text-gray-800 hover:bg-gray-200/90">
                                                {item.completed ? "Completed" : "Active"}
                                             </span>
                                          </div>
                                          <p className="text-sm font-normal dark:text-slate-200 text-slate-900 md:text-base mb-5">{item.description}</p>
                                       </div>
                                    </div>
                                    <div>
                                       <div className="px-5">
                                          <div>
                                             <div className="flex items-center justify-between">
                                                <p className="dark:text-slate-200 text-slate-900 text-xs md:text-sm">{item.totalFunds || 0} ETH raised</p>
                                                <p className="dark:text-slate-200 text-slate-900 text-xs md:text-sm">{((item.totalFunds || 0) / item.totalTarget) * 100}%</p>
                                             </div>
                                             <Progress progress={(item.totalFunds / item.totalTarget) * 100} />
                                          </div>
                                          <h6 className="dark:text-slate-200 text-slate-900 font-semibold text-sm md:text-base mt-1">Goal {item.totalTarget} ETH</h6>
                                       </div>
                                       <div className="flex space-x-3 px-5 pb-4 pt-2 items-center justify-between">
                                          <p className="text-sm text-slate-500 dark:text-blue-200">
                                             {new Date(item.deadline).toLocaleDateString("en-US", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                             })}
                                          </p>
                                          <Button size="sm" as={Link} disabled={item.completed} href={`/campaign/fund/${index}`} className="dark:hover:!bg-cyan-700 hover:!bg-cyan-800">
                                             <div className="flex items-center justify-center">
                                                <BadgeDollarSign className="mr-2 h-5 w-5" />
                                                Fund
                                             </div>
                                          </Button>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                           <Button size="lg" color="info" as={Link} href="/campaign" className="mx-auto mt-5 text-center dark:hover:!bg-cyan-700 hover:!bg-cyan-800">
                              More
                           </Button>
                        </>
                     ) : (
                        <p className="text-lg text-center my-5">No campaigns available</p>
                     )}
                  </>
               ) : (
                  <div>
                     <p className="text-center mt-5 text-xl">Please connect your wallet first then refresh the page</p>
                  </div>
               )}
            </div>
         </section>

         <section id="contact" className="py-5 md:py-10 lg:scroll-py-14">
            <h1 className="md:text-2xl xl:text-5xl font-semibold">Contact</h1>
            <p className="mt-4 text-sm mb-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo aliquam dignissimos provident, recusandae tempora laboriosam.</p>

            <div className="mt-5 space-y-8">
               <div className="flex items-center gap-4">
                  <Mail className="h-7 w-7 text-gray-700 dark:text-gray-300/50" />
                  <div>
                     <a href="mailto:example@example.com" className="text-sm hover:underline">
                        example@example.com
                     </a>
                  </div>
               </div>

               <div className="flex items-center gap-4">
                  <SmartphoneNfc className="h-7 w-7 text-gray-700 dark:text-gray-300/50" />
                  <div>
                     <a href="tel:088888888888" className="text-sm hover:underline">
                        088-888-8888
                     </a>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}
