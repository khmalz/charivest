"use client";

import { useEffect, useState } from "react";
import { Pagination, Table } from "flowbite-react";
import { initializeContract } from "@/utils/contractUtils";
import { tableThemeClient } from "@/helpers/theme/flowbiteTheme";

export default function LeaderboardTable() {
   const [data, setData] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const onPageChange = page => setCurrentPage(Number(page));

   const getLeaderboard = async () => {
      if (!window.ethereum) {
         alert("MetaMask is not installed. Please install it to use this feature.");
         return;
      }

      try {
         setIsLoading(true);
         const { contract } = await initializeContract();

         if (!contract) return;

         const donationEvents = await contract.queryFilter("DonationReceived");

         if (donationEvents.length === 0) {
            setData([]);
            return;
         }
         const donorTotals = {};

         donationEvents.forEach(event => {
            const { donor, amount } = event.args;

            if (!donorTotals[donor]) {
               donorTotals[donor] = BigInt(amount);
            } else {
               donorTotals[donor] += BigInt(amount);
            }
         });

         const leaderboard = Object.entries(donorTotals)
            .map(([address, total]) => ({ address, total }))
            .sort((a, b) => b.total - a.total);

         console.log(leaderboard);
         setData(leaderboard);
      } catch (error) {
         console.error("Error fetching leaderboard data:", error);
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      getLeaderboard();
   }, []);

   if (isLoading) {
      return <div>Loading...</div>;
   }

   return (
      <>
         <div className="overflow-x-auto mt-5">
            <Table theme={tableThemeClient}>
               <Table.Head>
                  <Table.HeadCell>Rank</Table.HeadCell>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell className="text-right">Total Fund</Table.HeadCell>
               </Table.Head>
               <Table.Body className="divide-y">
                  {data.slice((currentPage - 1) * 10, currentPage * 10).map((item, index) => (
                     <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{(currentPage - 1) * 10 + index + 1}</Table.Cell>
                        <Table.Cell>{item.address}</Table.Cell>
                        <Table.Cell className="text-right">{item.total_fund}$</Table.Cell>
                     </Table.Row>
                  ))}
               </Table.Body>
            </Table>
         </div>

         <div className="flex overflow-x-auto justify-center mt-2">
            <Pagination currentPage={currentPage} totalPages={Math.ceil(data.length / 10)} onPageChange={onPageChange} />
         </div>
      </>
   );
}
