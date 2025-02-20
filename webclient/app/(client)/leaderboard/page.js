import LeaderboardTable from "@/components/ui/LeaderboardTable";

export default function Leaderboard() {
   return (
      <section id="leaderbord" className="mt-5">
         <div>
            <h2 className="text-2xl font-bold dark:text-white text-slate-900 sm:text-4xl text-center">Leaderboard</h2>

            <LeaderboardTable />
         </div>
      </section>
   );
}
