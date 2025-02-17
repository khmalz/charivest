"use client";

import { tabsTheme } from "@/helpers/theme/flowbiteTheme";
import { initializeContract } from "@/utils/contractUtils";
import { ethers } from "ethers";
import { Tabs } from "flowbite-react";
import { useEffect, useState } from "react";
import CampaignCard from "./CampaignCard";

export default function CampaignListAdmin() {
   const [campaigns, setCampaigns] = useState({
      active: [],
      completed: [],
   });
   const [isConnected, setIsConnected] = useState(true);
   const [isLoading, setIsLoading] = useState(false);

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

            if (!campaignsData) {
               setCampaigns({
                  active: [],
                  completed: [],
               });
               return;
            }

            const formattedData = campaignsData.map(campaign => ({
               id: campaign.id,
               creator: campaign.creator,
               title: campaign.title,
               completed: campaign.isCompleted ? true : false,
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
      } catch (error) {
         console.info("Error getting contract balance:", error);
      }
   };

   const withdraw = async (id, creator) => {
      if (!window.ethereum) {
         alert("MetaMask is not installed. Please install it to use this feature.");
         return;
      }

      try {
         setIsLoading(true);

         const { contract, signer } = await initializeContract();

         if (contract) {
            setIsLoading(true);

            if (signer.address !== creator) {
               alert("You are not the creator of this campaign");
               return;
            }

            const tx = await contract.withDraw(id);
            await tx.wait();

            getCampaigns();
            console.log("Contract successfully withdrawn");
         }
      } catch (error) {
         console.error("Error to withdraw the contract balance:", error);
      } finally {
         setIsLoading(false);
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
                           <Tabs.Item active title="All">
                              {campaigns.active.length + campaigns.completed.length === 0 ? (
                                 <div className="flex flex-col items-center justify-center">
                                    <h1 className="dark:text-white text-slate-800">No campaign found</h1>
                                 </div>
                              ) : (
                                 <div className="mt-5 grid grid-cols-1 gap-4 mx-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {campaigns.active.concat(campaigns.completed).map((item, index) => (
                                       <CampaignCard key={index} item={item} onAdmin={true} buttonLoading={isLoading} withdrawnFunc={() => withdraw(item.id, item.creator)} />
                                    ))}
                                 </div>
                              )}
                           </Tabs.Item>
                        </Tabs.Item>
                        <Tabs.Item title="Active">
                           {campaigns.active.length == 0 ? (
                              <div className="flex flex-col items-center justify-center">
                                 <h1 className="dark:text-white text-slate-800">No campaign found</h1>
                              </div>
                           ) : (
                              <div className="mt-5 grid grid-cols-1 gap-4 mx-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                 {campaigns.active.map((item, index) => (
                                    <CampaignCard key={index} item={item} onAdmin={true} />
                                 ))}
                              </div>
                           )}
                        </Tabs.Item>
                        <Tabs.Item title="Completed">
                           {campaigns.completed.length == 0 ? (
                              <div className="flex flex-col items-center justify-center">
                                 <h1 className="dark:text-white text-slate-800">No campaign found</h1>
                              </div>
                           ) : (
                              <div className="mt-5 grid grid-cols-1 gap-4 mx-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                 {campaigns.completed.map((item, index) => (
                                    <CampaignCard key={index} item={item} onAdmin={true} buttonLoading={isLoading} withdrawnFunc={() => withdraw(item.id, item.creator)} />
                                 ))}
                              </div>
                           )}
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
