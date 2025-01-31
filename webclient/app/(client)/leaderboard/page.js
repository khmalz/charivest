"use client";

import { Pagination, Table } from "flowbite-react";
import { useState } from "react";

export default function Leaderboard() {
   const [currentPage, setCurrentPage] = useState(1);
   const onPageChange = page => setCurrentPage(Number(page));

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

   const tableTheme = {
      body: {
         cell: {
            base: "px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg dark:bg-slate-700",
         },
      },
      head: {
         cell: {
            base: "bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-600",
         },
      },
   };

   return (
      <section id="leaderbord" className="mt-5">
         <div>
            <h2 className="text-2xl font-bold dark:text-white text-slate-900 sm:text-4xl text-center">Leaderboard</h2>

            <div className="overflow-x-auto mt-5">
               <Table theme={tableTheme}>
                  <Table.Head>
                     <Table.HeadCell>Rank</Table.HeadCell>
                     <Table.HeadCell>Name</Table.HeadCell>
                     <Table.HeadCell className="text-right">Total Fund</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                     {leaderboards
                        .sort((a, b) => b.total_fund - a.total_fund)
                        .slice((currentPage - 1) * 10, currentPage * 10)
                        .map((item, index) => (
                           <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{(currentPage - 1) * 10 + index + 1}</Table.Cell>
                              <Table.Cell>{item.name}</Table.Cell>
                              <Table.Cell className="text-right">{item.total_fund}$</Table.Cell>
                           </Table.Row>
                        ))}
                  </Table.Body>
               </Table>
            </div>

            <div className="flex overflow-x-auto justify-center mt-2">
               <Pagination currentPage={currentPage} totalPages={Math.ceil(leaderboards.length / 10)} onPageChange={onPageChange} />
            </div>
         </div>
      </section>
   );
}
