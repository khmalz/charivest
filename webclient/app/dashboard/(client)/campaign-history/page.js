import { Card } from "flowbite-react";
import { BanknoteIcon, CalendarIcon, UserRound } from "lucide-react";

export default function DashboardCampaignHistory() {
   const campaigns = [
      {
         id: 1,
         title: "Campaign 1",
         fund: 500,
         anonim: true,
      },
      {
         id: 2,
         title: "Campaign 2",
         fund: 600,
         anonim: true,
      },
      {
         id: 3,
         title: "Campaign 3",
         fund: 200,
         anonim: false,
      },
      {
         id: 4,
         title: "Campaign 4",
         fund: 600,
         anonim: false,
      },
      {
         id: 5,
         title: "Campaign 5",
         fund: 200,
         anonim: true,
      },
      {
         id: 6,
         title: "Campaign 6",
         fund: 600,
         anonim: false,
      },
      {
         id: 7,
         title: "Campaign 7",
         fund: 200,
         anonim: true,
      },
      {
         id: 8,
         title: "Campaign 8",
         fund: 600,
         anonim: true,
      },
   ];

   const cardTheme = {
      root: {
         base: "flex flex-row rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 max-w-md w-full",
         children: "flex h-full flex-col justify-start gap-4 p-6",
      },
   };

   return (
      <div>
         <div>
            <h1 className="text-2xl font-bold">History</h1>
            <p className="text-xs md:text-sm dark:text-slate-200">Showing your history of funding campaign</p>
         </div>

         <div className="flex w-full">
            <div className="mt-5 grid grid-cols-1 gap-4 w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
               {campaigns.map(item => (
                  <Card theme={cardTheme} key={item.id}>
                     <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                     <div className="flex w-full items-center gap-x-3">
                        <div className="flex items-center gap-x-2">
                           <CalendarIcon className="w-5 h-5" />
                           <span className="text-sm">21/08/2024</span>
                        </div>
                        <div className="flex items-center gap-x-2">
                           <BanknoteIcon className="w-5 h-5" />
                           <span className="text-sm">${item.fund}</span>
                        </div>
                     </div>
                     <div>
                        <div className="flex items-center gap-x-2">
                           <UserRound className="w-5 h-5" />
                           <span className="text-sm">{!item.anonim && "Not"} Anonim</span>
                        </div>
                     </div>
                  </Card>
               ))}
            </div>
         </div>
      </div>
   );
}
