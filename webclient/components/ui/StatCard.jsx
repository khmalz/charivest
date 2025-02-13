"use client";

import { Card } from "flowbite-react";
import { cardThemeDashboard } from "../../helpers/theme/flowbiteTheme";

export default function StatCard({ icon: Icon, title, value, unit }) {
   return (
      <Card theme={cardThemeDashboard}>
         <div className="flex items-center space-x-1">
            <span>
               <Icon className="text-gray-700 dark:text-gray-400 w-5 h-5" />
            </span>
            <h5 className="font-bold text-sm sm:text-base text-gray-700 dark:text-gray-400">{title}</h5>
         </div>
         <p className="font-semibold text-gray-900 dark:text-white text-lg md:text-2xl">
            {value} {unit}
         </p>
      </Card>
   );
}
