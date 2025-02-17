"use client";

import { initializeContract } from "@/utils/contractUtils";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { HiCollection, HiCurrencyDollar, HiUserCircle } from "react-icons/hi";
import StatCard from "./StatCard";

export default function StatCardDashboard() {
   const [stats, setStats] = useState({
      campaignActive: 0,
      campaignEnded: 0,
      donor: 0,
      fund: 0,
   });

   const fetchCampaignAndDonationStats = async () => {
      try {
         const { contract } = await initializeContract();
         if (!contract) return;

         const campaignsData = await contract.getCampaigns();

         let campaignActive = 0;
         let campaignEnded = 0;

         if (campaignsData.length > 0) {
            campaignActive = campaignsData.filter(c => !c.isCompleted).length;
            campaignEnded = campaignsData.filter(c => c.isCompleted).length;
         }

         const filter = contract.filters.DonationReceived();
         const events = await contract.queryFilter(filter);

         let donorsSet = new Set();
         let totalAmount = BigInt(0);

         if (events.length > 0) {
            events.forEach(event => {
               if (event.args?.length >= 5) {
                  const [, _, donor, amount] = event.args;
                  donorsSet.add(donor);
                  totalAmount += BigInt(amount);
               }
            });
         }

         setStats({
            campaignActive,
            campaignEnded,
            donor: donorsSet.size,
            fund: ethers.formatEther(totalAmount.toString()),
         });
      } catch (error) {
         console.info("Error fetching campaign and donation stats:", error);
      }
   };

   useEffect(() => {
      fetchCampaignAndDonationStats();
   }, []);

   return (
      <>
         <StatCard icon={HiCollection} title="Campaign Active" value={stats.campaignActive} />
         <StatCard icon={HiCollection} title="Campaign Ended" value={stats.campaignEnded} />
         <StatCard icon={HiUserCircle} title="Donor" value={stats.donor} />
         <StatCard icon={HiCurrencyDollar} title="Fund" value={stats.fund} unit="ETH" />
      </>
   );
}
