import { Button, Progress } from "flowbite-react";
import { BadgeDollarSign, Pen, Trash } from "lucide-react";
import Link from "next/link";

export default function DashboardCampaign() {
   const campaigns = [
      {
         id: 1,
         title: "Campaign 1",
         category: "category",
         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto omnis consequuntur ullam eveniet nulla recusandae fugit ducimus tempora cum velit!",
         target: 1000,
         raised: 500,
      },
      {
         id: 2,
         title: "Campaign 2",
         category: "category",
         description: "Lorem ipsum dolor sit amet.",
         target: 2500,
         raised: 600,
      },
      {
         id: 3,
         title: "Campaign 3",
         category: "category",
         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto omnis consequuntur ullam eveniet nulla recusandae fugit ducimus tempora cum velit!",
         target: 800,
         raised: 200,
      },
      {
         id: 4,
         title: "Campaign 4",
         category: "category",
         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto omnis consequuntur ullam eveniet nulla recusandae fugit ducimus tempora cum velit!",
         target: 1500,
         raised: 600,
      },
   ];

   return (
      <div>
         <h1 className="text-2xl font-bold">List Campaign</h1>

         <div className="flex w-full">
            <div className="mt-5 grid grid-cols-1 gap-4 mx-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
               {campaigns.map(item => (
                  <div key={item.id} className="group flex max-w-md flex-col justify-between overflow-hidden rounded-lg dark:bg-slate-700 dark:shadow shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-102">
                     <div>
                        <div className="flex h-32 md:h-40 w-auto items-center justify-center bg-gray-400">
                           <svg className="h-10 w-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                           </svg>
                        </div>
                        <div className="p-5">
                           <h5 className="text-lg font-bold capitalize text-slate-900 tracking-tight dark:text-slate-200">{item.title}</h5>
                           <div className="md:my-3 my-2">
                              <span className="mr-2 inline-flex cursor-pointer items-center rounded-full bg-primary text-white dark:bg-gray-100 px-2.5 py-0.5 text-[10px] md:text-xs font-medium dark:text-gray-800 hover:bg-gray-200/90">
                                 {item.category}
                              </span>
                           </div>
                           <p className="text-xs font-normal dark:text-slate-200 text-slate-900 md:text-sm mb-5">{item.description}</p>
                        </div>
                     </div>
                     <div>
                        <div className="px-5">
                           <div>
                              <div className="flex items-center justify-between">
                                 <p className="dark:text-slate-200 text-slate-900 text-xs">${item.raised} raised</p>
                                 <p className="dark:text-slate-200 text-slate-900 text-xs">{(item.raised * 100) / item.target}%</p>
                              </div>
                              <Progress progress={45} className="my-1" />
                           </div>
                           <h6 className="dark:text-slate-200 text-slate-900 font-semibold text-xs md:text-sm mt-1">Goal ${item.target}</h6>
                        </div>
                        <div className="flex space-x-3 px-5 pb-4 pt-2 items-center justify-between">
                           <p className="text-xs text-slate-500 dark:text-blue-200">2 Jan 2025</p>
                           <div className="flex items-center gap-1">
                              <Button size="xs" as={Link} href={`/dashboard/campaign/${item.id}/edit`} className="dark:hover:!bg-cyan-700 hover:!bg-cyan-800">
                                 <div className="flex items-center justify-center">
                                    <Pen className="h-4 w-4" />
                                 </div>
                              </Button>
                              <Button size="xs" color="failure">
                                 <div className="flex items-center justify-center">
                                    <Trash className="h-4 w-4" />
                                 </div>
                              </Button>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
