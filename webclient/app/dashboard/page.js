"use client";

import { cardThemeDashboard, tableThemeDashboard } from "@/components/theme/flowbiteTheme";
import { Card, Table } from "flowbite-react";
import { HiCollection, HiCurrencyDollar, HiUserCircle } from "react-icons/hi";

export default function Dashboard() {
   return (
      <section id="dashboard">
         <div>
            <h1 className="text-2xl font-bold">Dashboard Page</h1>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
               <Card theme={cardThemeDashboard}>
                  <div className="flex items-center space-x-1">
                     <span>
                        <HiCollection className="text-gray-700 dark:text-gray-400 w-5 h-5" />
                     </span>
                     <h5 className="font-bold text-sm sm:text-base text-gray-700 dark:text-gray-400">Campaign Active</h5>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white text-lg md:text-2xl">250</p>
               </Card>
               <Card theme={cardThemeDashboard}>
                  <div className="flex items-center space-x-1">
                     <span>
                        <HiCollection className="text-gray-700 dark:text-gray-400 w-5 h-5" />
                     </span>
                     <h5 className="font-bold text-sm sm:text-base text-gray-700 dark:text-gray-400">Campaign Ended</h5>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white text-lg md:text-2xl">250</p>
               </Card>
               <Card theme={cardThemeDashboard}>
                  <div className="flex items-center space-x-1">
                     <span>
                        <HiUserCircle className="text-gray-700 dark:text-gray-400 w-5 h-5" />
                     </span>
                     <h5 className="font-bold text-sm sm:text-base text-gray-700 dark:text-gray-400">Donor</h5>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white text-lg md:text-2xl">190</p>
               </Card>
               <Card theme={cardThemeDashboard}>
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
                     <Table theme={tableThemeDashboard}>
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
