"use client";

import { useState } from "react";
import { tableThemeClient } from "../../../helpers/theme/flowbiteTheme";
import { Pagination, Table } from "flowbite-react";

export default function LeaderboardTable({ data }) {
   const [currentPage, setCurrentPage] = useState(1);
   const onPageChange = page => setCurrentPage(Number(page));

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
                  {data
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
            <Pagination currentPage={currentPage} totalPages={Math.ceil(data.length / 10)} onPageChange={onPageChange} />
         </div>
      </>
   );
}
