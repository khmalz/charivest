"use client";

import { isAddressNull } from "@/helpers/utils";
import { initializeContract } from "@/utils/contractUtils";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import CampaignCard from "./CampaignCard";

export default function CampaignList({ take, onlyActive }) {
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

      if (isAddressNull()) {
         setIsConnected(false);
         return;
      } else setIsConnected(true);

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

            const filteredData = onlyActive ? campaignsData.filter(campaign => !campaign.isCompleted) : campaignsData;

            const formattedData = filteredData.slice(0, take ? take : filteredData.length).map(campaign => ({
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
               <div className="mt-5 grid grid-cols-1 gap-4 mx-auto md:mx-0 md:grid-cols-2 xl:grid-cols-3">
                  {campaigns.active.length + campaigns.completed.length > 0 ? (
                     campaigns.active.concat(campaigns.completed).map((item, index) => <CampaignCard key={index} item={item} />)
                  ) : (
                     <>
                        <p className="text-lg">No campaigns available</p>
                     </>
                  )}
               </div>
            </>
         ) : (
            <p className="text-center mt-5 text-xl">Please connect your wallet first then refresh the page</p>
         )}
      </>
   );
}
