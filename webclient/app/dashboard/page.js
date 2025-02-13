"use client";

import { cardThemeDashboard } from "@/components/theme/flowbiteTheme";
import { initializeContract } from "@/utils/contractUtils";
import { ethers } from "ethers";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiCollection, HiCurrencyDollar, HiUserCircle } from "react-icons/hi";

export default function Dashboard() {
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
               if (event.args?.length >= 3) {
                  const [, donor, amount] = event.args;
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
      <section id="dashboard">
         <div>
            <h1 className="text-2xl font-bold">Dashboard Page</h1>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
               <Card theme={cardThemeDashboard}>
                  <div className="flex items-center space-x-1">
                     <span>
                        <HiCollection className="text-gray-700 dark:text-gray-400 w-5 h-5" />
                     </span>
                     <h5 className="font-bold text-sm sm:text-base text-gray-700 dark:text-gray-400">Campaign Active</h5>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white text-lg md:text-2xl">{stats.campaignActive}</p>
               </Card>
               <Card theme={cardThemeDashboard}>
                  <div className="flex items-center space-x-1">
                     <span>
                        <HiCollection className="text-gray-700 dark:text-gray-400 w-5 h-5" />
                     </span>
                     <h5 className="font-bold text-sm sm:text-base text-gray-700 dark:text-gray-400">Campaign Ended</h5>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white text-lg md:text-2xl">{stats.campaignEnded}</p>
               </Card>
               <Card theme={cardThemeDashboard}>
                  <div className="flex items-center space-x-1">
                     <span>
                        <HiUserCircle className="text-gray-700 dark:text-gray-400 w-5 h-5" />
                     </span>
                     <h5 className="font-bold text-sm sm:text-base text-gray-700 dark:text-gray-400">Donor</h5>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white text-lg md:text-2xl">{stats.donor}</p>
               </Card>
               <Card theme={cardThemeDashboard}>
                  <div className="flex items-center space-x-1">
                     <span>
                        <HiCurrencyDollar className="text-gray-700 dark:text-gray-400 w-5 h-5" />
                     </span>
                     <h5 className="font-bold text-sm sm:text-base text-gray-700 dark:text-gray-400">Fund</h5>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white text-lg md:text-2xl">{stats.fund} ETH</p>
               </Card>
            </div>
         </div>
      </section>
   );
}
