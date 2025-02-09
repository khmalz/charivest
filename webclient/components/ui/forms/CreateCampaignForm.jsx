"use client";

import { datepickerTheme } from "@/components/theme/flowbiteTheme";
import { DropzoneInput } from "@/components/ui/DropzoneInput";
import { initializeContract } from "@/utils/contractUtils";
import { ethers } from "ethers";
import { Button, Datepicker, Label, Textarea, TextInput } from "flowbite-react";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function CreateCampaignForm() {
   const [files, setFiles] = useState([]);
   const [deadline, setDeadline] = useState(new Date(Date.now() + 86400000));
   const [isLoading, setIsLoading] = useState(false);

   const handleDelete = index => {
      setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
   };

   const thumbs = files.map((fileWrapper, index) => (
      <div key={index} className="relative py-2 w-56">
         <button type="button" onClick={() => handleDelete(index)} className="absolute top-0 right-0 p-1 m-4 text-white rounded-full bg-gray-100/80 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-bg-gray-100/80 hover:bg-gray-100">
            <X className="text-black w-8" />
         </button>
         <Image src={fileWrapper.preview} width={128} height={128} alt={`image-preview-${index}`} className="w-56 h-56 object-cover rounded-md" />
      </div>
   ));

   const createCampaign = async e => {
      e.preventDefault();

      if (!window.ethereum) {
         alert("MetaMask is not installed. Please install it to use this feature.");
         return;
      }

      const campaignData = {
         title: "",
         description: "",
         totalTarget: "",
         deadline: "",
         photos: [],
      };

      try {
         const formData = new FormData(e.target);

         campaignData.title = formData.get("title");
         campaignData.description = formData.get("description");
         campaignData.totalTarget = ethers.parseEther("1.0");

         const dateDeadline = new Date(formData.get("deadline"));
         campaignData.deadline = Math.floor(dateDeadline.getTime() / 1000);
         campaignData.photos = await uploadImage();
      } catch (error) {
         console.error("error get data:", error);
      }

      try {
         setIsLoading(true);

         const { contract } = await initializeContract();

         if (contract) {
            const txCampaign = await contract.createCampaign(campaignData.title, campaignData.description, campaignData.totalTarget, campaignData.deadline, campaignData.photos);
            await txCampaign.wait();

            console.log("Campaign created");
         }
      } catch (error) {
         console.error("Error getting contract balance:", error);
      } finally {
         setIsLoading(false);
      }
   };

   const uploadImage = async () => {
      const formData = new FormData();
      files.forEach(fileWrap => formData.append("files", fileWrap.file));

      try {
         setIsLoading(true);

         const response = await fetch("/api/campaign/images", {
            method: "POST",
            body: formData,
         });

         const result = await response.json();

         if (response.ok) {
            return result.uploadedFiles;
         } else {
            console.error("Upload error:", result.error);
            return [];
         }
      } catch (error) {
         console.error("Error:", error);
         return [];
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <form onSubmit={createCampaign}>
         <div className="flex flex-col w-full mt-3 space-y-2">
            <div className="grid sm:grid-cols-2 sm:gap-x-2 gap-y-2 sm:gap-y-0">
               <div>
                  <div className="mb-2 block">
                     <Label htmlFor="title" className="dark:text-white text-slate-800" value="Title" />
                  </div>
                  <TextInput id="title" type="text" name="title" placeholder="Title" required />
               </div>
               <div>
                  <div className="mb-2 block">
                     <Label htmlFor="deadline" className="dark:text-white text-slate-800" value="Deadline" />
                  </div>
                  <Datepicker
                     language="id-ID"
                     theme={datepickerTheme}
                     name="deadline"
                     labelTodayButton="Hari Ini"
                     labelClearButton="Clear"
                     minDate={new Date(Date.now() + 86400000)}
                     value={deadline}
                     onChange={(e, date) => setDeadline(date)}
                     required
                  />
               </div>
            </div>
            <div className="max-w-full">
               <div className="mb-2 block">
                  <Label htmlFor="description" value="Description" className="dark:text-white text-slate-800" />
               </div>
               <Textarea id="description" placeholder="Leave a description..." rows={4} name="description" required />
            </div>
            <div>
               <div className="mb-2 block">
                  <Label htmlFor="image" value="Image" className="dark:text-white text-slate-800" />
               </div>

               <DropzoneInput setFiles={setFiles} filesLength={files.length} />

               {files.length > 0 && <div className="flex space-x-4 mt-2">{thumbs}</div>}
            </div>
            <div className="flex justify-end mt-5">
               <Button color="light" isProcessing={isLoading} type="submit" className="border-none dark:hover:bg-slate-700 dark:bg-slate-800 max-w-28 md:max-w-32 w-full">
                  Submit
               </Button>
            </div>
         </div>
      </form>
   );
}
