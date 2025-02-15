import Image from "next/image";
import { BadgeDollarSign } from "lucide-react";
import Link from "next/link";
import { Button, Progress } from "flowbite-react";

export default function CampaignCard({ item, onAdmin }) {
   return (
      <div className="group flex max-w-md flex-col justify-between overflow-hidden rounded-lg dark:bg-slate-700 dark:shadow shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-102">
         <div>
            {item.photos.length > 0 ? (
               <div className={`${onAdmin ? "h-32 md:h-40" : "h-52"} w-auto overflow-hidden`}>
                  <Image width={500} height={500} className="w-full rounded-t-lg" src={item.photos[0]} alt={item.title} />
               </div>
            ) : (
               <div className={`flex ${onAdmin ? "h-32 md:h-40" : "h-52"} w-auto items-center justify-center bg-gray-400`}>
                  <svg className="h-10 w-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                     <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
               </div>
            )}
            <div className="p-5">
               <h5 className={`${onAdmin ? "text-lg" : "text-2xl"} font-bold capitalize text-slate-900 tracking-tight dark:text-slate-200`}>{item.title}</h5>
               <div className="md:my-3 my-2">
                  <span className="mr-2 inline-flex cursor-pointer items-center rounded-full bg-primary text-white dark:bg-gray-100 px-2.5 py-0.5 text-xs font-medium dark:text-gray-800 hover:bg-gray-200/90">
                     {item.completed ? "Completed" : "Active"}
                  </span>
               </div>
               <p className={`${onAdmin ? "text-xs md:text-sm" : "text-sm md:text-base"} font-normal dark:text-slate-200 text-slate-900 mb-5`}>{item.description}</p>
            </div>
         </div>
         <div>
            <div className="px-5">
               <div className="flex items-center justify-between">
                  <p className="dark:text-slate-200 text-slate-900 text-xs md:text-sm">{item.totalFunds || 0} ETH raised</p>
                  <p className="dark:text-slate-200 text-slate-900 text-xs md:text-sm">{Math.round((parseFloat(item.totalFunds) / parseFloat(item.totalTarget)) * 100)}%</p>
               </div>
               <Progress progress={(item.totalFunds / item.totalTarget) * 100} className="my-1" />
               <h6 className="dark:text-slate-200 text-slate-900 font-semibold text-sm md:text-base mt-1">Goal {item.totalTarget} ETH</h6>
            </div>
            <div className="flex space-x-3 px-5 pb-4 pt-2 items-center justify-between">
               <p className="text-sm text-slate-500 dark:text-blue-200">{new Date(item.deadline).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</p>
               {onAdmin ? (
                  item.completed && (
                     <Button size="xs">
                        <div className="flex items-center justify-center">Withdraw</div>
                     </Button>
                  )
               ) : (
                  <Button size="sm" as={Link} disabled={item.completed} href={`/campaign/fund/${item.id}`} className="dark:hover:!bg-cyan-700 hover:!bg-cyan-800">
                     <div className="flex items-center justify-center">
                        <BadgeDollarSign className="mr-2 h-5 w-5" />
                        Fund
                     </div>
                  </Button>
               )}
            </div>
         </div>
      </div>
   );
}
