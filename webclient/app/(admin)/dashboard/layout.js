import { DrawerProvider } from "@/components/hooks/useDrawer";
import DrawerDashboard from "@/components/ui/DrawerDashboard";
import { SidebarDashboard } from "@/components/ui/Sidebar";

export default function DashboardLayout({ children }) {
   return (
      <DrawerProvider>
         <div className="dark:text-white text-slate-900 bg-slate-200 dark:bg-dashboardprimary min-h-screen antialiased">
            <div className="flex">
               <SidebarDashboard />
               <div className="flex flex-col w-full">
                  <DrawerDashboard />
                  <div className="py-2 px-4">{children}</div>
               </div>
            </div>
         </div>
      </DrawerProvider>
   );
}
