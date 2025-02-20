import ProfileForm from "@/app/_components/ui/forms/ProfileForm";
import { verifySession } from "@/app/_lib/dal";
import { notFound } from "next/navigation";

export default async function DashboardProfile() {
   const data = await verifySession();

   if (!data.isAuth) {
      console.log("User not authenticated");
      notFound();
   }

   return (
      <div>
         <h1 className="text-2xl font-bold">User Profile</h1>

         <div className="mt-5 w-full shadow-lg dark:bg-dashboardsecondary p-5 rounded-lg flex flex-col space-y-5">
            <h3>Personal Information</h3>

            <div className="flex space-x-5">
               <ProfileForm address={data.address} />
            </div>
         </div>
      </div>
   );
}
