"use client";

import { datepickerTheme } from "@/helpers/theme/flowbiteTheme";
import { DropzoneInput } from "@/components/ui/DropzoneInput";
import { initializeContract } from "@/utils/contractUtils";
import { ethers } from "ethers";
import { Button, Datepicker, Label, Textarea, TextInput } from "flowbite-react";
import { DollarSignIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function CreateCampaignForm() {
   const [forms, setForms] = useState({
      title: "",
      description: "",
      amount: "",
      deadline: new Date(Date.now() + 86400000),
   });
   const [files, setFiles] = useState([]);
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
         setIsLoading(true);

         const formData = new FormData(e.target);

         campaignData.title = formData.get("title");
         campaignData.description = formData.get("description");
         campaignData.totalTarget = ethers.parseEther(formData.get("amount"));
         const dateDeadline = new Date(formData.get("deadline"));
         campaignData.deadline = Math.floor(dateDeadline.getTime() / 1000);
         campaignData.photos = await uploadImage();
      } catch (error) {
         console.error("error get data:", error);
      } finally {
         setIsLoading(false);
      }

      try {
         const { contract } = await initializeContract();

         if (contract) {
            const txCampaign = await contract.createCampaign(campaignData.title, campaignData.description, campaignData.totalTarget, campaignData.deadline, campaignData.photos);
            await txCampaign.wait();

            console.log("Campaign created");
            setForms({
               title: "",
               description: "",
               amount: "",
               deadline: "",
            });
            setFiles([]);
         }
      } catch (error) {
         if (campaignData.photos.length > 0) {
            await deleteUploadedImages(campaignData.photos);
         }

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

   const deleteUploadedImages = async imageUrls => {
      try {
         const response = await fetch("/api/campaign/images", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrls }),
         });

         const result = await response.json();
         if (!response.ok) {
            console.error("Failed to delete images:", result.error);
         }
      } catch (error) {
         console.error("Error deleting images:", error);
      }
   };

   return (
      <form onSubmit={createCampaign}>
         <div className="flex flex-col w-full mt-3 space-y-3">
            <div>
               <div className="mb-2 block">
                  <Label htmlFor="title" className="dark:text-white text-slate-800" value="Title" />
               </div>
               <TextInput id="title" type="text" name="title" value={forms.title} onInput={e => setForms({ ...forms, title: e.target.value })} placeholder="Title" required />
            </div>
            <div className="grid sm:grid-cols-2 sm:gap-x-2 gap-y-2 sm:gap-y-0">
               <div>
                  <div className="mb-2 block">
                     <Label htmlFor="amount" className="dark:text-white text-slate-800" value="Amount Target (in ETH)" />
                  </div>
                  <div className="w-full mt-2">
                     <TextInput id="amount" type="number" value={forms.amount} onInput={e => setForms({ ...forms, amount: e.target.value })} icon={DollarSignIcon} rightIcon={DollarSignIcon} name="amount" placeholder="amount" required />
                  </div>
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
                     value={forms.deadline}
                     onChange={(_, date) => setForms({ ...forms, deadline: date })}
                     required
                  />
               </div>
            </div>
            <div className="max-w-full">
               <div className="mb-2 block">
                  <Label htmlFor="description" value="Description" className="dark:text-white text-slate-800" />
               </div>
               <Textarea id="description" placeholder="Leave a description..." value={forms.description} onInput={e => setForms({ ...forms, description: e.target.value })} rows={4} name="description" required />
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
