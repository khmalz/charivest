import Navbar from "@/components/manual/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeDollarSign, MailOpen } from "lucide-react";

export default function Home() {
   return (
      <div>
         <Navbar />

         <section id="home" className="container mt-20 grid min-h-screen grid-cols-1 md:mt-0 md:grid-cols-2 md:items-center">
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

         <section id="campaign" className="container mt-20 min-h-screen md:mt-0">
            <h3 className="text-center text-2xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">Campaign List</h3>

            <div className="mx-auto mt-14 grid grid-cols-1 gap-8 md:mx-0 md:grid-cols-2 xl:grid-cols-3">
               <div className="group flex max-w-md flex-col justify-between overflow-hidden rounded-lg bg-blue-800 shadow backdrop-blur-md transition-transform duration-300 hover:scale-102">
                  <div>
                     <div className="flex h-52 w-auto items-center justify-center bg-gray-400">
                        <svg className="h-10 w-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                           <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                     </div>

                     <div className="p-5">
                        <h5 className="text-xl font-bold capitalize tracking-tight text-white">apa</h5>
                        <div className="my-3">
                           <span className="mr-2 inline-flex cursor-pointer items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 hover:bg-gray-200/90">apa</span>
                        </div>
                        <p className="text-sm font-normal text-slate-100 md:text-base">Lorem ipsum dolor sit amet.</p>
                     </div>
                  </div>
                  <div className="flex space-x-3 px-5 pb-4 pt-2">
                     <Button className="bg-white text-black w-full hover:bg-white/90">
                        <BadgeDollarSign /> Fund
                     </Button>
                  </div>
               </div>
               <div className="group flex max-w-md flex-col justify-between overflow-hidden rounded-lg bg-blue-800 shadow backdrop-blur-md transition-transform duration-300 hover:scale-102">
                  <div>
                     <div className="flex h-52 w-auto items-center justify-center bg-gray-400">
                        <svg className="h-10 w-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                           <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                     </div>

                     <div className="p-5">
                        <h5 className="text-xl font-bold capitalize tracking-tight text-white">apa</h5>
                        <div className="my-3">
                           <span className="mr-2 inline-flex cursor-pointer items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 hover:bg-gray-200/90">apa</span>
                        </div>
                        <p className="text-sm font-normal text-slate-100 md:text-base">Lorem ipsum dolor sit amet.</p>
                     </div>
                  </div>
                  <div className="flex space-x-3 px-5 pb-4 pt-2">
                     <Button className="bg-white text-black w-full hover:bg-white/90">
                        <BadgeDollarSign /> Fund
                     </Button>
                  </div>
               </div>
               <div className="group flex max-w-md flex-col justify-between overflow-hidden rounded-lg bg-blue-800 shadow backdrop-blur-md transition-transform duration-300 hover:scale-102">
                  <div>
                     <div className="flex h-52 w-auto items-center justify-center bg-gray-400">
                        <svg className="h-10 w-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                           <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                     </div>

                     <div className="p-5">
                        <h5 className="text-xl font-bold capitalize tracking-tight text-white">apa</h5>
                        <div className="my-3">
                           <span className="mr-2 inline-flex cursor-pointer items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 hover:bg-gray-200/90">apa</span>
                        </div>
                        <p className="text-sm font-normal text-slate-100 md:text-base">Lorem ipsum dolor sit amet.</p>
                     </div>
                  </div>
                  <div className="flex space-x-3 px-5 pb-4 pt-2">
                     <Button className="bg-white text-black w-full hover:bg-white/90">
                        <BadgeDollarSign /> Fund
                     </Button>
                  </div>
               </div>
               <div className="group flex max-w-md flex-col justify-between overflow-hidden rounded-lg bg-blue-800 shadow backdrop-blur-md transition-transform duration-300 hover:scale-102">
                  <div>
                     <div className="flex h-52 w-auto items-center justify-center bg-gray-400">
                        <svg className="h-10 w-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                           <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                     </div>

                     <div className="p-5">
                        <h5 className="text-xl font-bold capitalize tracking-tight text-white">apa</h5>
                        <div className="my-3">
                           <span className="mr-2 inline-flex cursor-pointer items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 hover:bg-gray-200/90">apa</span>
                        </div>
                        <p className="text-sm font-normal text-slate-100 md:text-base">Lorem ipsum dolor sit amet.</p>
                     </div>
                  </div>
                  <div className="flex space-x-3 px-5 pb-4 pt-2">
                     <Button className="bg-white text-black w-full hover:bg-white/90">
                        <BadgeDollarSign /> Fund
                     </Button>
                  </div>
               </div>
               <div className="group flex max-w-md flex-col justify-between overflow-hidden rounded-lg bg-blue-800 shadow backdrop-blur-md transition-transform duration-300 hover:scale-102">
                  <div>
                     <div className="flex h-52 w-auto items-center justify-center bg-gray-400">
                        <svg className="h-10 w-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                           <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                     </div>

                     <div className="p-5">
                        <h5 className="text-xl font-bold capitalize tracking-tight text-white">apa</h5>
                        <div className="my-3">
                           <span className="mr-2 inline-flex cursor-pointer items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 hover:bg-gray-200/90">apa</span>
                        </div>
                        <p className="text-sm font-normal text-slate-100 md:text-base">Lorem ipsum dolor sit amet.</p>
                     </div>
                  </div>
                  <div className="flex space-x-3 px-5 pb-4 pt-2">
                     <Button className="bg-white text-black w-full hover:bg-white/90">
                        <BadgeDollarSign /> Fund
                     </Button>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}
