import CampaignHistory from "@/app/_components/ui/CampaignHistory";
import { verifySession } from "@/app/_lib/dal";

export default async function DashboardCampaignHistory() {
   const data = await verifySession();

   if (!data.isAuth) {
      console.log("User not authenticated");
      return (
         <div className="w-full h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">User Not Authenticated</h2>
            <p>Could not find requested resource</p>
         </div>
      );
   }

   return (
      <div>
         <div>
            <h1 className="text-2xl font-bold">History</h1>
            <p className="text-xs md:text-sm dark:text-slate-200">Showing your history of funding campaign</p>
         </div>

         <div className="flex w-full">
            <CampaignHistory address={data.address} />
         </div>
      </div>
   );
}
