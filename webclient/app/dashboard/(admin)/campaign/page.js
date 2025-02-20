import CampaignListAdmin from "@/app/_components/ui/CampaignListAdmin";

export default function DashboardCampaign() {
   return (
      <div>
         <h1 className="text-2xl font-bold">List Campaign</h1>

         <div className="flex w-full">
            <CampaignListAdmin />
         </div>
      </div>
   );
}
