"use client";

import { Button, Checkbox, Label, Progress, Radio, TextInput } from "flowbite-react";
import { DollarSignIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { initializeContract } from "@/utils/contractUtils";
import { progressTheme } from "@/components/theme/flowbiteTheme";
import { ethers } from "ethers";

export default function FundCampaign() {
   const { id } = useParams();
   const [clickOther, setClickOther] = useState(false);
   const [amountValue, setAmountValue] = useState("Other");
   const [campaign, setCampaign] = useState({});

   useEffect(() => {
      if (!window.ethereum) {
         alert("Please install MetaMask!");
      }
   }, []);

   const handleRadioChange = e => {
      const value = e.target.value;
      setAmountValue(value);
      setClickOther(value === "Other");
   };

   const getDetailCampaign = async () => {
      if (!window.ethereum) {
         alert("MetaMask is not installed. Please install it to use this feature.");
         return;
      }

      const { contract } = await initializeContract();

      if (contract) {
         const campaignDetail = await contract.getDetailCampaign(id);

         if (campaignDetail) {
            setCampaign({
               creator: campaignDetail.creator,
               title: campaignDetail.title,
               description: campaignDetail.description,
               target: ethers.formatEther(campaignDetail.totalTarget),
               deadline: Number(campaignDetail.deadline) * 1000,
               totalFunds: ethers.formatEther(campaignDetail.totalFunds),
            });
         }
      }
   };

   const handleDonation = async () => {
      if (!window.ethereum) {
         alert("MetaMask is not installed. Please install it to use this feature.");
         return;
      }

      const { contract } = await initializeContract();

      if (contract) {
         const amountInWei = ethers.parseEther(amountValue || "0");
         const tx = await contract.donate(id, { value: amountInWei });

         alert("Donation transaction sent!");
         await tx.wait();
         alert("Donation successful!");

         getDetailCampaign();
      }
   };

   useEffect(() => {
      getDetailCampaign();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <section id="fund" className="mt-5">
         <div>
            <h3 className="text-2xl font-bold dark:text-white text-slate-900 sm:text-3xl mt-5">Fund Campaign</h3>

            <div className="my-3">
               <h5 className="font-bold dark:text-white text-slate-900 text-xl">
                  {campaign.title} by {campaign.creator}
               </h5>
            </div>

            <div className="mt-5">
               <p className="mb-1">Campaign Raised: {campaign.totalFunds} ETH</p>
               <Progress theme={progressTheme} progress={campaign.target / campaign.totalFunds} progressLabelPosition="inside" textLabel={`Campaign Goal: ${campaign.target} ETH`} textLabelPosition="outside" size="lg" labelProgress labelText />
            </div>

            <div className="mt-5">
               <legend className="md:text-base text-sm dark:text-slate-200 text-slate-900">Choose an amount</legend>

               <ul className="items-center w-full mt-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                     <div className="flex items-center gap-3">
                        <Radio id="5$" name="amount" value="5" className="hidden peer" onChange={handleRadioChange} />
                        <Label
                           htmlFor="5$"
                           className="w-full py-4 rounded-lg ps-2 text-sm hover:cursor-pointer font-medium text-gray-900 dark:text-gray-300 dark:peer-checked:bg-slate-200 dark:peer-checked:text-primary peer-checked:bg-cyan-600 peer-checked:text-white">
                           $5
                        </Label>
                     </div>
                  </li>
                  <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                     <div className="flex items-center gap-3">
                        <Radio id="10$" name="amount" value="10" className="hidden peer" onChange={handleRadioChange} />
                        <Label
                           htmlFor="10$"
                           className="w-full py-4 rounded-lg ps-2 text-sm hover:cursor-pointer font-medium text-gray-900 dark:text-gray-300 dark:peer-checked:bg-slate-200 dark:peer-checked:text-primary peer-checked:bg-cyan-600 peer-checked:text-white">
                           $10
                        </Label>
                     </div>
                  </li>
                  <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                     <div className="flex items-center gap-3">
                        <Radio id="20$" name="amount" value="20" className="hidden peer" onChange={handleRadioChange} />
                        <Label
                           htmlFor="20$"
                           className="w-full py-4 rounded-lg ps-2 text-sm hover:cursor-pointer font-medium text-gray-900 dark:text-gray-300 dark:peer-checked:bg-slate-200 dark:peer-checked:text-primary peer-checked:bg-cyan-600 peer-checked:text-white">
                           $20
                        </Label>
                     </div>
                  </li>
                  <li className="w-full dark:border-gray-600">
                     <div className="flex items-center gap-3">
                        <Radio id="other" name="amount" value="Other" className="hidden peer" onChange={handleRadioChange} />
                        <Label
                           htmlFor="other"
                           className="w-full py-4 rounded-lg ps-2 text-sm hover:cursor-pointer font-medium text-gray-900 dark:text-gray-300 dark:peer-checked:bg-slate-200 dark:peer-checked:text-primary peer-checked:bg-cyan-600 peer-checked:text-white">
                           Other
                        </Label>
                     </div>
                  </li>
               </ul>
            </div>

            <div className="mt-5" hidden={!clickOther}>
               <legend className="md:text-sm text-xs dark:text-slate-200 text-slate-900">Pick your own amount</legend>
               <div className="max-w-xs mt-2">
                  <TextInput id="amount" type="number" icon={DollarSignIcon} rightIcon={DollarSignIcon} onInput={e => setAmountValue(e.target.value || "Other")} placeholder="amount" required />
               </div>
            </div>

            <div className="mt-5">
               <div className="flex gap-2">
                  <div className="flex h-5 items-center">
                     <Checkbox id="anonym" className="focus:ring-0" />
                  </div>
                  <div className="flex flex-col">
                     <Label htmlFor="anonym" className="selection:bg-none">
                        Anonim
                     </Label>
                     <div className="text-gray-500 dark:text-gray-300">
                        <span className="text-xs font-normal">Your donation will be anonymous</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="mt-5">
               <Button onClick={handleDonation}>Fund {amountValue != "Other" ? `$${amountValue}` : ""}</Button>
            </div>
         </div>
      </section>
   );
}
