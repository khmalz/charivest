"use client";

import CampaignList from "@/components/ui/CampaignList";

export default function Campaign() {
   return (
      <section id="campaign" className="mt-5">
         <div className="flex flex-col">
            <h3 className="text-2xl font-bold dark:text-white text-slate-900 sm:text-4xl">Campaign List</h3>

            <CampaignList />
         </div>
      </section>
   );
}
