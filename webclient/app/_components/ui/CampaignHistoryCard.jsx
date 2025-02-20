"use client";

import { cardThemeClient } from "@/helpers/theme/flowbiteTheme";
import { Card } from "flowbite-react";
import { BanknoteIcon, CalendarIcon, UserRound } from "lucide-react";
import React from "react";

export default function CampaignHistoryCard({ campaign }) {
   return (
      <Card theme={cardThemeClient}>
         <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{campaign.title}</h5>
         <div className="flex w-full items-center gap-x-3">
            <div className="flex items-center gap-x-2">
               <CalendarIcon className="w-5 h-5" />
               <span className="text-sm">{new Date(campaign.donation_at).toLocaleString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</span>
            </div>
            <div className="flex items-center gap-x-2">
               <BanknoteIcon className="w-5 h-5" />
               <span className="text-sm">{campaign.amount} ETH</span>
            </div>
         </div>
         <div>
            <div className="flex items-center gap-x-2">
               <UserRound className="w-5 h-5" />
               <span className="text-sm">{!campaign.anonim && "Not"} Anonim</span>
            </div>
         </div>
      </Card>
   );
}
