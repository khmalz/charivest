import CampaignList from "@/app/_components/ui/CampaignList";
import { Mail, SmartphoneNfc } from "lucide-react";

export default function Home() {
   return (
      <div>
         <section id="home" className="grid min-h-screen grid-cols-1 md:grid-cols-2 items-center">
            <div className="flex flex-col items-center space-y-4 md:items-start md:space-y-2 self-center">
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

         <section id="campaign" className="mt-20 md:mt-0">
            <div className="flex flex-col">
               <h3 className="text-center text-2xl font-bold dark:text-white sm:text-4xl">Campaign List</h3>

               <CampaignList take={3} />
            </div>
         </section>

         <section id="contact" className="py-5 md:py-10 lg:scroll-py-14">
            <h1 className="md:text-2xl xl:text-5xl font-semibold">Contact</h1>
            <p className="mt-4 text-sm mb-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo aliquam dignissimos provident, recusandae tempora laboriosam.</p>

            <div className="mt-5 space-y-8">
               <div className="flex items-center gap-4">
                  <Mail className="h-7 w-7 text-gray-700 dark:text-gray-300/50" />
                  <div>
                     <a href="mailto:example@example.com" className="text-sm hover:underline">
                        example@example.com
                     </a>
                  </div>
               </div>

               <div className="flex items-center gap-4">
                  <SmartphoneNfc className="h-7 w-7 text-gray-700 dark:text-gray-300/50" />
                  <div>
                     <a href="tel:088888888888" className="text-sm hover:underline">
                        088-888-8888
                     </a>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}
