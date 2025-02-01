"use client";

import { Card, Table } from "flowbite-react";
import { HiCollection, HiCurrencyDollar, HiUserCircle } from "react-icons/hi";

export default function Dashboard() {
   const cardTheme = {
      root: {
         base: "flex flex-row rounded-xl w-full border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 md:max-w-md w-full",
         children: "flex h-full flex-col justify-start gap-4 p-6",
      },
   };

   const tableTheme = {
      body: {
         base: "group/body",
         cell: {
            base: "px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
         },
      },
      head: {
         cell: {
            base: "bg-gray-50 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-transparent",
         },
      },
   };

   return (
      <section id="dashboard">
         <div>
            <h1 className="text-2xl font-bold">Dashboard Page</h1>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
               <Card theme={cardTheme}>
                  <div className="flex items-center space-x-1">
                     <span>
                        <HiCollection className="text-gray-700 dark:text-gray-400 w-5 h-5" />
                     </span>
                     <h5 className="font-bold text-sm sm:text-base text-gray-700 dark:text-gray-400">Campaign Active</h5>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white text-lg md:text-2xl">250</p>
               </Card>
               <Card theme={cardTheme}>
                  <div className="flex items-center space-x-1">
                     <span>
                        <HiCollection className="text-gray-700 dark:text-gray-400 w-5 h-5" />
                     </span>
                     <h5 className="font-bold text-sm sm:text-base text-gray-700 dark:text-gray-400">Campaign Ended</h5>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white text-lg md:text-2xl">250</p>
               </Card>
               <Card theme={cardTheme}>
                  <div className="flex items-center space-x-1">
                     <span>
                        <HiUserCircle className="text-gray-700 dark:text-gray-400 w-5 h-5" />
                     </span>
                     <h5 className="font-bold text-sm sm:text-base text-gray-700 dark:text-gray-400">Donor</h5>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white text-lg md:text-2xl">190</p>
               </Card>
               <Card theme={cardTheme}>
                  <div className="flex items-center space-x-1">
                     <span>
                        <HiCurrencyDollar className="text-gray-700 dark:text-gray-400 w-5 h-5" />
                     </span>
                     <h5 className="font-bold text-sm sm:text-base text-gray-700 dark:text-gray-400">Fund</h5>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white text-lg md:text-2xl">$25000</p>
               </Card>
            </div>

            <div className="mt-5 flex gap-x-3 w-full">
               <Card className="w-full md:w-1/2">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">New Campaign</h5>
                  <div className="overflow-x-auto">
                     <Table theme={tableTheme}>
                        <Table.Head>
                           <Table.HeadCell>Title</Table.HeadCell>
                           <Table.HeadCell>Deadline</Table.HeadCell>
                           <Table.HeadCell>Target</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                           <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{'Apple MacBook Pro 17"'}</Table.Cell>
                              <Table.Cell>20 Nov 2022</Table.Cell>
                              <Table.Cell>$2999</Table.Cell>
                           </Table.Row>
                           <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Microsoft Surface Pro</Table.Cell>
                              <Table.Cell>18 Dec 2022</Table.Cell>
                              <Table.Cell>$1999</Table.Cell>
                           </Table.Row>
                           <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Magic Mouse 2</Table.Cell>
                              <Table.Cell>21 Jan 2023</Table.Cell>
                              <Table.Cell>$99</Table.Cell>
                           </Table.Row>
                        </Table.Body>
                     </Table>
                  </div>
               </Card>
            </div>
         </div>
      </section>
   );
}
