import LeaderboardTable from "@/app/_components/ui/LeaderboardTable";

export default function Leaderboard() {
   const leaderboards = [
      {
         id: 1,
         name: "John",
         total_fund: 10000,
      },
      {
         id: 2,
         name: "Marry",
         total_fund: 2000,
      },
      {
         id: 3,
         name: "Carol",
         total_fund: 1000,
      },
      {
         id: 4,
         name: "Bob",
         total_fund: 900,
      },
      {
         id: 5,
         name: "Alice",
         total_fund: 800,
      },
      {
         id: 6,
         name: "Andrew",
         total_fund: 9000,
      },
      {
         id: 7,
         name: "Kevin",
         total_fund: 2000,
      },
      {
         id: 8,
         name: "Tom",
         total_fund: 1000,
      },
      {
         id: 9,
         name: "Bob",
         total_fund: 900,
      },
      {
         id: 10,
         name: "Alice",
         total_fund: 800,
      },
      {
         id: 11,
         name: "Andrew",
         total_fund: 9000,
      },
      {
         id: 12,
         name: "Kevin",
         total_fund: 2000,
      },
      {
         id: 13,
         name: "Tom",
         total_fund: 1000,
      },
   ];

   return (
      <section id="leaderbord" className="mt-5">
         <div>
            <h2 className="text-2xl font-bold dark:text-white text-slate-900 sm:text-4xl text-center">Leaderboard</h2>

            <LeaderboardTable data={leaderboards} />
         </div>
      </section>
   );
}
