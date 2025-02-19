"use client";

import { Button, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

export default function ProfileForm({ address }) {
   const [username, setUsername] = useState("");
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const savedUsername = localStorage.getItem("username");
      if (savedUsername) setUsername(savedUsername);
   }, []);

   const handleRename = async () => {
      if (!window.ethereum) {
         alert("MetaMask is not installed. Please install it to use this feature.");
         return;
      }

      try {
         setLoading(true);

         const response = await fetch(`/api/users/profile`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ address, username }),
         });

         const res = await response.json();

         if (response.ok && res) {
            console.log(res);
            setUsername(res.data.username);
            localStorage.setItem("username", res.data.username);

            alert("Profile updated successfully!");
         } else {
            console.error(res);
         }
      } catch (err) {
         console.error(err);
      } finally {
         setLoading(false);
      }
   };

   return (
      <>
         <form className="w-full" onSubmit={e => e.preventDefault()}>
            <div className="mb-2 block">
               <Label htmlFor="name" className="dark:text-white text-slate-800" value="Name" />
            </div>
            <div className="flex space-x-1.5">
               <TextInput id="name" theme={{ field: { input: { sizes: { sm: "p-2 text-sm" } } } }} type="text" sizing="sm" className="w-full sm:max-w-xs" value={username} onChange={e => setUsername(e.target.value)} />
               <Button onClick={handleRename} isProcessing={loading} color="light" className="border-none dark:hover:bg-slate-700 dark:bg-slate-800" size="sm">
                  Rename
               </Button>
            </div>
         </form>
      </>
   );
}
