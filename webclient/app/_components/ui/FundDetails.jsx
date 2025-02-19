"use client";

import { useState, useEffect, useCallback } from "react";
import { initializeContract } from "@/utils/contractUtils";
import { ethers } from "ethers";
import { Progress } from "flowbite-react";
import FundForm from "@/app/_components/ui/forms/FundForm";
import { isValidBytes32 } from "@/helpers/utils";
import Loading from "@/app/(client)/campaign/loading";
import { notFound } from "next/navigation";

export default function FundDetails({ id }) {
   const [campaign, setCampaign] = useState({});
   const [isConnected, setIsConnected] = useState(true);
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(true);

   const getDetailCampaign = useCallback(async () => {
      if (!window.ethereum) {
         alert("MetaMask is not installed. Please install it to use this feature.");
         setIsConnected(false);
         return;
      }

      try {
         const { contract } = await initializeContract();

         if (!isValidBytes32(id)) {
            throw new Error("Invalid campaign ID!");
         }

         const campaignDetail = await contract.getDetailCampaign(id);

         if (!campaignDetail) {
            throw new Error("Campaign not found!");
         }

         const campaignData = {
            creator: campaignDetail.creator,
            title: campaignDetail.title,
            completed: campaignDetail.isCompleted,
            totalTarget: ethers.formatEther(campaignDetail.totalTarget),
            totalFunds: ethers.formatEther(campaignDetail.totalFunds),
         };
         setCampaign(campaignData);
      } catch (error) {
         if (["Campaign not found", "Invalid campaign ID"].some(msg => error.message.includes(msg))) {
            setError("404");
            return;
         }
         setError(error.message);
      } finally {
         setLoading(false);
      }
   }, [id]);

   useEffect(() => {
      getDetailCampaign();
   }, [getDetailCampaign]);

   if (loading) {
      return <Loading />;
   }

   if (error === "404") {
      notFound();
   }

   return (
      <>
         {isConnected ? (
            <div>
               <h3 className="text-2xl font-bold dark:text-white text-slate-900 sm:text-3xl mt-5">Fund Campaign</h3>

               <div className="my-3">
                  <h5 className="font-bold dark:text-white text-slate-900 text-xl">
                     {campaign.title} by {campaign.creator}
                  </h5>
               </div>

               <div className="mt-5">
                  <p className="mb-1">Campaign Raised: {campaign.totalFunds} ETH</p>
                  <Progress
                     progress={parseInt((parseFloat(campaign.totalFunds) / parseFloat(campaign.totalTarget)) * 100)}
                     progressLabelPosition="inside"
                     textLabel={`Campaign Goal: ${campaign.totalTarget} ETH`}
                     textLabelPosition="outside"
                     size="lg"
                     labelProgress
                     labelText
                  />
               </div>

               {!campaign.completed ? (
                  <FundForm completedCampaign={campaign.completed} id={id} getDetailCampaign={getDetailCampaign} />
               ) : (
                  <div>
                     <h3 className="text-2xl font-bold dark:text-white text-slate-900 sm:text-3xl mt-10 text-center">Campaign is Completed</h3>
                  </div>
               )}
            </div>
         ) : (
            <p className="text-center mt-5 text-xl">Please connect your wallet first then refresh the page</p>
         )}
      </>
   );
}
