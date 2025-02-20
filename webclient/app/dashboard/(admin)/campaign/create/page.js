import CreateCampaignForm from "@/app/_components/ui/forms/CreateCampaignForm";

export default function DashboardCreateCampaign() {
   return (
      <div>
         <h1 className="text-2xl font-bold">Create Campaign</h1>

         <div className="mt-5 w-full shadow-lg dark:bg-dashboardsecondary p-5 rounded-lg flex flex-col space-y-5">
            <div className="flex">
               <div className="w-full">
                  <CreateCampaignForm />
               </div>
            </div>
         </div>
      </div>
   );
}
