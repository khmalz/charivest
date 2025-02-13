"use client";

import { initializeContract } from "@/utils/contractUtils";
import { ethers } from "ethers";
import { Progress } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CampaignListAdmin() {
   const [campaigns, setCampaigns] = useState([]);
   const [isConnected, setIsConnected] = useState(true);

   const getCampaigns = async () => {
      if (!window.ethereum) {
         alert("MetaMask is not installed. Please install it to use this feature.");
         setIsConnected(false);
         return;
      }

      try {
         const { contract } = await initializeContract();

         if (contract) {
            const campaignsData = await contract.getCampaigns();

            if (campaignsData) {
               const formattedData = campaignsData.map(campaign => ({
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
      getCampaigns();
   }, []);

   return (
      <>
         {isConnected ? (
            <>
               <div className="mt-5 grid grid-cols-1 gap-4 mx-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {campaigns.length > 0 ? (
                     campaigns.map((item, index) => (
                        <div key={index} className="group flex max-w-md flex-col justify-between overflow-hidden rounded-lg dark:bg-slate-700 dark:shadow shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-102">
                           <div>
                              <div className="h-32 md:h-40 w-auto overflow-hidden">
                                 <Image width={500} height={500} className="w-full rounded-t-lg" src={item.photos[0]} alt={item.title} />
                              </div>
                              <div className="p-5">
                                 <h5 className="text-lg font-bold capitalize text-slate-900 tracking-tight dark:text-slate-200">{item.title}</h5>
                                 <div className="md:my-3 my-2">
                                    <span className="mr-2 inline-flex cursor-pointer items-center rounded-full bg-primary text-white dark:bg-gray-100 px-2.5 py-0.5 text-[10px] md:text-xs font-medium dark:text-gray-800 hover:bg-gray-200/90">
                                       {item.completed ? "Completed" : "Active"}
                                    </span>
                                 </div>
                                 <p className="text-xs font-normal dark:text-slate-200 text-slate-900 md:text-sm mb-5">{item.description}</p>
                              </div>
                           </div>
                           <div>
                              <div className="px-5">
                                 <div>
                                    <div className="flex items-center justify-between">
                                       <p className="dark:text-slate-200 text-slate-900 text-xs">{item.totalFunds || 0} ETH raised</p>
                                       <p className="dark:text-slate-200 text-slate-900 text-xs">{((item.totalFunds || 0) / item.totalTarget) * 100}%</p>
                                    </div>
                                    <Progress progress={(item.totalFunds / item.totalTarget) * 100} className="my-1" />
                                 </div>
                                 <h6 className="dark:text-slate-200 text-slate-900 font-semibold text-xs md:text-sm mt-1">Goal {item.totalTarget} ETH</h6>
                              </div>
                              <div className="flex space-x-3 px-5 pb-4 pt-2 items-center justify-between">
                                 <p className="text-xs text-slate-500 dark:text-blue-200">
                                    {new Date(item.deadline).toLocaleDateString("en-US", {
                                       day: "2-digit",
                                       month: "short",
                                       year: "numeric",
                                    })}
                                 </p>
                              </div>
                           </div>
                        </div>
                     ))
                  ) : (
                     <p className="text-lg">No campaigns available</p>
                  )}
               </div>
            </>
         ) : (
            <p className="text-center mt-5 text-xl">Please connect your wallet first then refresh the page</p>
         )}
      </>
   );
}
