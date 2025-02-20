import { ethers } from "ethers";

export const formatAddress = addr => {
   return `${addr?.substring(0, 15)}...`;
};

export const isAddressNull = () => {
   const getAddress = async () => {
      try {
         const response = await fetch("/api/auth/session", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            next: { revalidate: 3600 },
         });
         const data = await response.json();

         if (!data.isAuth) {
            console.log("User not authenticated");
            return;
         }

         console.log("User authenticated:", data.address);
         return data.address;
      } catch (error) {
         console.error("Error checking session:", error);
      }
   };

   const address = getAddress();
   return address === null;
};

export const isValidBytes32 = id => {
   try {
      const bytes = ethers.getBytes(id);
      return bytes.length === 32;
   } catch (error) {
      return false;
   }
};
