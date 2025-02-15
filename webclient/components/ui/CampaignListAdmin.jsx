"use client";

import { tabsTheme } from "@/helpers/theme/flowbiteTheme";
import { initializeContract } from "@/utils/contractUtils";
import { ethers } from "ethers";
import { Button, Progress, Tabs } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CampaignListAdmin() {
   const [campaigns, setCampaigns] = useState({
      active: [],
      completed: [],
   });
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

               setCampaigns({
                  active: formattedData.filter(campaign => !campaign.completed),
                  completed: formattedData.filter(campaign => campaign.completed),
               });
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
               <div className="mt-2.5">
                  {campaigns.active.concat(campaigns.completed).length > 0 ? (
                     <Tabs theme={tabsTheme} aria-label="Pills" variant="pills">
                        <Tabs.Item active title="All">
                           {campaigns.active.concat(campaigns.completed).length == 0 && (
                              <div className="flex flex-col items-center justify-center">
                                 <h1 className="dark:text-white text-slate-800">No campaign found</h1>
                              </div>
                           )}

                           <div className="mt-5 grid grid-cols-1 gap-4 mx-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                              {campaigns.active.concat(campaigns.completed).map((item, index) => (
                                 <div key={index} className="group flex max-w-md flex-col justify-between overflow-hidden rounded-lg dark:bg-slate-700 dark:shadow shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-102">
                                    <div>
                                       {item.photos.length > 0 ? (
                                          <div className="h-32 md:h-40 w-auto overflow-hidden">
                                             <Image width={500} height={500} className="w-full rounded-t-lg" src={item.photos[0]} alt={item.title} />
                                          </div>
                                       ) : (
                                          <div className="flex h-32 md:h-40 w-auto items-center justify-center bg-gray-400">
                                             <svg className="h-10 w-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                             </svg>
                                          </div>
                                       )}
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
                                                <p className="dark:text-slate-200 text-slate-900 text-xs">{Math.round((parseFloat(item.totalFunds) / parseFloat(item.totalTarget)) * 100)}%</p>
                                             </div>
                                             <Progress progress={(item.totalFunds / item.totalTarget) * 100} className="my-1" />
                                          </div>
                                          <h6 className="dark:text-slate-200 text-slate-900 font-semibold text-xs md:text-sm mt-1">Goal {item.totalTarget} ETH</h6>
                                       </div>
                                       <div className="flex space-x-3 px-5 pb-4 pt-2 items-center justify-between">
                                          <p className="text-xs text-slate-500 dark:text-blue-200">{new Date(item.deadline).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</p>
                                          {item.completed && (
                                             <div>
                                                <Button size="xs">
                                                   <div className="flex items-center justify-center">Withdraw</div>
                                                </Button>
                                             </div>
                                          )}
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </Tabs.Item>
                        <Tabs.Item title="Active">
                           {campaigns.active.length == 0 && (
                              <div className="flex flex-col items-center justify-center">
                                 <h1 className="dark:text-white text-slate-800">No campaign found</h1>
                              </div>
                           )}

                           <div className="mt-5 grid grid-cols-1 gap-4 mx-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                              {campaigns.active.map((item, index) => (
                                 <div key={index} className="group flex max-w-md flex-col justify-between overflow-hidden rounded-lg dark:bg-slate-700 dark:shadow shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-102">
                                    <div>
                                       {item.photos.length > 0 ? (
                                          <div className="h-32 md:h-40 w-auto overflow-hidden">
                                             <Image width={500} height={500} className="w-full rounded-t-lg" src={item.photos[0]} alt={item.title} />
                                          </div>
                                       ) : (
                                          <div className="flex h-32 md:h-40 w-auto items-center justify-center bg-gray-400">
                                             <svg className="h-10 w-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                             </svg>
                                          </div>
                                       )}
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
                                                <p className="dark:text-slate-200 text-slate-900 text-xs">{Math.round((parseFloat(item.totalFunds) / parseFloat(item.totalTarget)) * 100)}%</p>
                                             </div>
                                             <Progress progress={(item.totalFunds / item.totalTarget) * 100} className="my-1" />
                                          </div>
                                          <h6 className="dark:text-slate-200 text-slate-900 font-semibold text-xs md:text-sm mt-1">Goal {item.totalTarget} ETH</h6>
                                       </div>
                                       <div className="flex space-x-3 px-5 pb-4 pt-2 items-center justify-between">
                                          <p className="text-xs text-slate-500 dark:text-blue-200">{new Date(item.deadline).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</p>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </Tabs.Item>
                        <Tabs.Item title="Completed">
                           {campaigns.completed.length == 0 && (
                              <div className="flex flex-col items-center justify-center">
                                 <h1 className="dark:text-white text-slate-800">No campaign found</h1>
                              </div>
                           )}
                           <div className="mt-5 grid grid-cols-1 gap-4 mx-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                              {campaigns.completed.map((item, index) => (
                                 <div key={index} className="group flex max-w-md flex-col justify-between overflow-hidden rounded-lg dark:bg-slate-700 dark:shadow shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-102">
                                    <div>
                                       {item.photos.length > 0 ? (
                                          <div className="h-32 md:h-40 w-auto overflow-hidden">
                                             <Image width={500} height={500} className="w-full rounded-t-lg" src={item.photos[0]} alt={item.title} />
                                          </div>
                                       ) : (
                                          <div className="flex h-32 md:h-40 w-auto items-center justify-center bg-gray-400">
                                             <svg className="h-10 w-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                             </svg>
                                          </div>
                                       )}
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
                                                <p className="dark:text-slate-200 text-slate-900 text-xs">{Math.round((parseFloat(item.totalFunds) / parseFloat(item.totalTarget)) * 100)}%</p>
                                             </div>
                                             <Progress progress={(item.totalFunds / item.totalTarget) * 100} className="my-1" />
                                          </div>
                                          <h6 className="dark:text-slate-200 text-slate-900 font-semibold text-xs md:text-sm mt-1">Goal {item.totalTarget} ETH</h6>
                                       </div>
                                       <div className="flex space-x-3 px-5 pb-4 pt-2 items-center justify-between">
                                          <p className="text-xs text-slate-500 dark:text-blue-200">{new Date(item.deadline).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</p>
                                          {item.completed && (
                                             <div>
                                                <Button size="xs">
                                                   <div className="flex items-center justify-center">Withdraw</div>
                                                </Button>
                                             </div>
                                          )}
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </Tabs.Item>
                     </Tabs>
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
