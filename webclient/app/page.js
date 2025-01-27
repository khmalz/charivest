import { Button, Progress } from "flowbite-react";
import { BadgeDollarSign } from "lucide-react";

export default function Home() {
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
         <section id="home" className="grid min-h-screen grid-cols-1 md:grid-cols-2 md:items-center">
            <div className="flex flex-col items-center space-y-4 self-end md:items-start md:space-y-2 md:self-center">
               <div className="py-10">
                  <h1 className="text-center text-3xl font-bold dark:text-white sm:text-4xl md:text-start md:text-5xl lg:text-6xl">Campaign Uenjeh</h1>
               </div>
               <div>
                  <h4 className="text-base font-bold dark:text-white md:text-lg lg:text-xl">
                     <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto omnis consequuntur ullam eveniet nulla recusandae fugit ducimus tempora cum velit!</span>
                  </h4>
               </div>
            </div>
         </section>

         <section id="campaign" className="mt-20 min-h-screen md:mt-0">
            <h3 className="text-center text-2xl font-bold dark:text-white sm:text-4xl md:text-5xl">Campaign List</h3>

            <div className="mx-auto mt-14 grid grid-cols-1 gap-4 md:mx-0 md:grid-cols-2 xl:grid-cols-3">
               {campaigns.map(item => (
                  <div key={item.id} className="group flex max-w-md flex-col justify-between overflow-hidden rounded-lg dark:bg-slate-700 dark:shadow shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-102">
                     <div>
                        <div className="flex h-52 w-auto items-center justify-center bg-gray-400">
                           <svg className="h-10 w-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                           </svg>
                        </div>

                        <div className="p-5">
                           <h5 className="text-2xl font-bold capitalize tracking-tight dark:text-slate-200">{item.title}</h5>
                           <div className="my-3">
                              <span className="mr-2 inline-flex cursor-pointer items-center rounded-full bg-primary text-white dark:bg-gray-100 px-2.5 py-0.5 text-xs font-medium dark:text-gray-800 hover:bg-gray-200/90">{item.category}</span>
                           </div>
                           <p className="text-sm font-normal dark:text-slate-200 md:text-base mb-5">{item.description}</p>
                        </div>
                     </div>
                     <div>
                        <div className="px-5">
                           <div>
                              <div className="flex items-center justify-between">
                                 <p className="dark:text-slate-200 text-xs md:text-sm">${item.raised} raised</p>
                                 <p className="dark:text-slate-200 text-xs md:text-sm">{(item.raised * 100) / item.target}%</p>
                              </div>
                              <Progress progress={45} />
                           </div>
                           <h6 className="dark:text-slate-200 font-semibold text-sm md:text-base mt-1">Goal ${item.target}</h6>
                        </div>
                        <div className="flex space-x-3 px-5 pb-4 pt-2 items-center justify-between">
                           <p className="text-sm text-slate-500 dark:text-blue-200">2 Jan 2025</p>
                           <Button size="sm">
                              <div className="flex items-center justify-center">
                                 <BadgeDollarSign className="mr-2 h-5 w-5" />
                                 Fund
                              </div>
                           </Button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </section>
      </div>
   );
}
