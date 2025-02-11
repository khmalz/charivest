"use client";

import { initializeContract } from "@/utils/contractUtils";
import { ethers } from "ethers";
import { Button, Progress } from "flowbite-react";
import { BadgeDollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Campaign() {
   const [campaigns, setCampaigns] = useState([]);

   // const campaigns = [
   //    {
   //       id: 1,
   //       title: "Campaign 1",
   //       category: "category",
   //       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto omnis consequuntur ullam eveniet nulla recusandae fugit ducimus tempora cum velit!",
   //       target: 1000,
   //       raised: 500,
   //    },
   //    {
   //       id: 2,
   //       title: "Campaign 2",
   //       category: "category",
   //       description: "Lorem ipsum dolor sit amet.",
   //       target: 2500,
   //       raised: 600,
   //    },
   //    {
   //       id: 3,
   //       title: "Campaign 3",
   //       category: "category",
   //       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto omnis consequuntur ullam eveniet nulla recusandae fugit ducimus tempora cum velit!",
   //       target: 800,
   //       raised: 200,
   //    },
   //    {
   //       id: 4,
   //       title: "Campaign 4",
   //       category: "category",
   //       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto omnis consequuntur ullam eveniet nulla recusandae fugit ducimus tempora cum velit!",
   //       target: 1500,
   //       raised: 600,
   //    },
   // ];

   const getCampaigns = async () => {
      if (!window.ethereum) {
         alert("MetaMask is not installed. Please install it to use this feature.");
         return;
      }

      try {
         const { contract } = await initializeContract();

         if (contract) {
            const campaignsData = await contract.getCampaigns();

            if (campaignsData) {
               const formattedData = campaignsData.map(campaign => ({
                  creator: campaign.creator,
                  title: campaign.title,
                  description: campaign.description,
                  totalTarget: ethers.formatEther(campaign.totalTarget),
                  deadline: Number(campaign.deadline) * 1000,
                  photos: campaign.photos,
               }));

               setCampaigns(formattedData);
            }
         }
      } catch (error) {
         console.error("Error getting contract balance:", error);
      }
   };

   useEffect(() => {
      getCampaigns();
      console.log("selesai");
   }, []);

   return (
      <section id="campaign" className="mt-5">
         <div className="flex flex-col">
            <h3 className="text-2xl font-bold dark:text-white text-slate-900 sm:text-4xl">Campaign List</h3>

            <div className="mt-5 grid grid-cols-1 gap-4 mx-auto md:mx-0 md:grid-cols-2 xl:grid-cols-3">
               {campaigns.length > 0 ? (
                  campaigns.map((item, index) => (
                     <div key={index} className="group flex max-w-md flex-col justify-between overflow-hidden rounded-lg dark:bg-slate-700 dark:shadow shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-102">
                        <div>
                           {/* <div className="flex h-52 w-auto items-center justify-center bg-gray-400">
                              <svg className="h-10 w-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                 <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                              </svg>
                           </div> */}
                           <div className="h-52 w-auto overflow-hidden">
                              <Image width={500} height={500} className="w-full rounded-t-lg" src={item.photos[0]} alt={item.title} />
                           </div>
                           <div className="p-5">
                              <h5 className="text-2xl font-bold capitalize text-slate-900 tracking-tight dark:text-slate-200">{item.title}</h5>
                              <p className="text-sm font-normal dark:text-slate-200 text-slate-900 md:text-base mb-5 mt-3">{item.description}</p>
                           </div>
                        </div>
                        <div>
                           <div className="px-5">
                              <div>
                                 <div className="flex items-center justify-between">
                                    <p className="dark:text-slate-200 text-slate-900 text-xs md:text-sm">${item.raised || 0} raised</p>
                                    <p className="dark:text-slate-200 text-slate-900 text-xs md:text-sm">{(item.raised || 0 * 100) / item.totalTarget}%</p>
                                 </div>
                                 <Progress progress={45} />
                              </div>
                              <h6 className="dark:text-slate-200 text-slate-900 font-semibold text-sm md:text-base mt-1">Goal ${item.totalTarget}</h6>
                           </div>
                           <div className="flex space-x-3 px-5 pb-4 pt-2 items-center justify-between">
                              <p className="text-sm text-slate-500 dark:text-blue-200">
                                 {new Date(item.deadline).toLocaleDateString("en-US", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                 })}
                              </p>
                              <Button size="sm" as={Link} href={`/campaign/fund/${index}`} className="dark:hover:!bg-cyan-700 hover:!bg-cyan-800">
                                 <div className="flex items-center justify-center">
                                    <BadgeDollarSign className="mr-2 h-5 w-5" />
                                    Fund
                                 </div>
                              </Button>
                           </div>
                        </div>
                     </div>
                  ))
               ) : (
                  <p>No campaigns available</p>
               )}
            </div>
         </div>
      </section>
   );
}
