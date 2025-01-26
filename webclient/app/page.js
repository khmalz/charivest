import Nav from "@/components/ui/Nav";
import { Button } from "flowbite-react";
import { BadgeDollarSign } from "lucide-react";

export default function Home() {
   return (
      <div>
         <section id="home" className="grid min-h-screen grid-cols-1 md:grid-cols-2 md:items-center">
            <div className="flex flex-col items-center space-y-4 self-end md:items-start md:space-y-2 md:self-center">
               <div className="py-10">
                  <h1 className="text-center text-3xl font-bold text-white sm:text-4xl md:text-start md:text-5xl lg:text-6xl">Campaign Uenjeh</h1>
               </div>
               <div>
                  <h4 className="text-base font-bold text-white md:text-lg lg:text-xl">
                     <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto omnis consequuntur ullam eveniet nulla recusandae fugit ducimus tempora cum velit!</span>
                  </h4>
               </div>
            </div>
         </section>

         <section id="campaign" className="mt-20 min-h-screen md:mt-0">
            <h3 className="text-center text-2xl font-bold text-white sm:text-4xl md:text-5xl">Campaign List</h3>

            <div className="mx-auto mt-14 grid grid-cols-1 gap-4 md:mx-0 md:grid-cols-2 xl:grid-cols-3">
               {[1, 2, 3, 4, 5, 6].map(item => (
                  <div key={item} className="group flex max-w-md flex-col justify-between overflow-hidden rounded-lg bg-slate-700 shadow backdrop-blur-md transition-transform duration-300 hover:scale-102">
                     <div>
                        <div className="flex h-52 w-auto items-center justify-center bg-gray-400">
                           <svg className="h-10 w-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                           </svg>
                        </div>

                        <div className="p-5">
                           <h5 className="text-2xl font-bold capitalize tracking-tight text-slate-200">title</h5>
                           <div className="my-3">
                              <span className="mr-2 inline-flex cursor-pointer items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 hover:bg-gray-200/90">kategori</span>
                           </div>
                           <p className="text-sm font-normal text-slate-200 md:text-base">Lorem ipsum dolor sit amet.</p>
                           <h6 className="text-slate-200 font-semibold text-xl mt-3">Rp4.000.000</h6>
                        </div>
                     </div>
                     <div className="flex space-x-3 px-5 pb-4 pt-2 items-center justify-between">
                        <p className="text-sm text-blue-200">2 Jan 2025</p>
                        <Button size="sm">
                           <div className="flex items-center justify-center">
                              <BadgeDollarSign className="mr-2 h-5 w-5" />
                              Fund
                           </div>
                        </Button>
                     </div>
                  </div>
               ))}
            </div>
         </section>
      </div>
   );
}
