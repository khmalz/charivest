"use client";

import { initializeContract } from "@/utils/contractUtils";
import { ethers } from "ethers";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import CampaignHistoryCard from "./CampaignHistoryCard";

export default function CampaignHistory({ address }) {
   const [campaigns, setCampaigns] = useState([]);
   const [error, setError] = useState("");

   useEffect(() => {
      getHistoryCampagins(address);
   }, []);

   const getHistoryCampagins = async walletAddress => {
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
            setError("No history found");
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

   if (error === "No history found") {
      notFound();
   }

   return (
      <div className="mt-5 grid grid-cols-1 gap-4 w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
         {campaigns.map((campaign, index) => (
            <CampaignHistoryCard campaign={campaign} key={index} />
         ))}
      </div>
   );
}
