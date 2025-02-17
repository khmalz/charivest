"use client";

import { cardThemeClient } from "@/helpers/theme/flowbiteTheme";
import { initializeContract } from "@/utils/contractUtils";
import { ethers } from "ethers";
import { Card } from "flowbite-react";
import { BanknoteIcon, CalendarIcon, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardCampaignHistory() {
   const [campaigns, setCampaigns] = useState([]);

   useEffect(() => {
      const walletAddress = localStorage.getItem("walletAddress");
      if (!walletAddress) return;

      const getHistoryCampagins = async () => {
         if (!window.ethereum) {
            alert("MetaMask is not installed. Please install it to use this feature.");
            setIsConnected(false);
            return;
         }

         try {
            const { contract } = await initializeContract();

            if (!contract) return;

            const filter = contract.filters.DonationReceived(null, null, walletAddress, null, null);
            const events = await contract.queryFilter(filter);

            if (events.length === 0) return;

            const campaignHistory = [];

            if (events.length == 0) {
               setCampaigns(campaignHistory);
               return;
            }

            events.map(event => {
               if (event.args?.length >= 4) {
                  const [campaignId, title, _, amount, donation_at] = event.args;
                  campaignHistory.push({
                     id: campaignId,
                     title,
                     amount: ethers.formatEther(amount),
                     donation_at: Number(donation_at) * 1000,
                  });
               }
            });
            setCampaigns(campaignHistory);
         } catch (error) {
            console.info(error);
         }
      };

      getHistoryCampagins();
   }, []);

   return (
      <div>
         <div>
            <h1 className="text-2xl font-bold">History</h1>
            <p className="text-xs md:text-sm dark:text-slate-200">Showing your history of funding campaign</p>
         </div>

         <div className="flex w-full">
            <div className="mt-5 grid grid-cols-1 gap-4 w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
               {campaigns.map((item, index) => (
                  <Card theme={cardThemeClient} key={index}>
                     <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                     <div className="flex w-full items-center gap-x-3">
                        <div className="flex items-center gap-x-2">
                           <CalendarIcon className="w-5 h-5" />
                           <span className="text-sm">{new Date(item.donation_at).toLocaleString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</span>
                        </div>
                        <div className="flex items-center gap-x-2">
                           <BanknoteIcon className="w-5 h-5" />
                           <span className="text-sm">{item.amount} ETH</span>
                        </div>
                     </div>
                     <div>
                        <div className="flex items-center gap-x-2">
                           <UserRound className="w-5 h-5" />
                           <span className="text-sm">{!item.anonim && "Not"} Anonim</span>
                        </div>
                     </div>
                  </Card>
               ))}
            </div>
         </div>
      </div>
   );
}
