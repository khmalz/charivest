import StatCardDashboard from "@/app/_components/ui/StatCardDashboard";

export default function Dashboard() {
   return (
      <section id="dashboard">
         <div>
            <h1 className="text-2xl font-bold">Dashboard Page</h1>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
               <StatCardDashboard />
            </div>
         </div>
      </section>
   );
}
