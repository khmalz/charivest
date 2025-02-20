"use client";

import { datepickerTheme } from "@/helpers/theme/flowbiteTheme";
import { DropzoneInput } from "@/app/_components/ui/DropzoneInput";
import { initializeContract } from "@/utils/contractUtils";
import { ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";
import { Button, Datepicker, Label, Textarea, TextInput } from "flowbite-react";
import { DollarSignIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { deleteImagesCampaign, uploadImagesCampaign } from "@/app/_actions/admin/actionCampaign";

export default function CreateCampaignForm() {
   const [forms, setForms] = useState({
      title: "",
      description: "",
      amount: "",
      deadline: new Date(Date.now() + 86400000),
   });
   const [images, setImages] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   const handleDeletePreview = index => {
      setImages(prevImages => prevImages.filter((_, i) => i !== index));
   };

   const createCampaign = async (formData, imgUrls) => {
      if (!window.ethereum) {
         alert("MetaMask is not installed. Please install it to use this feature.");
         return;
      }

      const campaignData = {
         title: "",
         description: "",
         totalTarget: "",
         deadline: "",
         photos: imgUrls,
      };

      const uuid = uuidv4();
      const campaignId = ethers.keccak256(ethers.toUtf8Bytes(uuid));

      campaignData.id = campaignId;
      campaignData.title = formData.get("title");
      campaignData.description = formData.get("description");
      campaignData.totalTarget = ethers.parseEther(formData.get("amount"));
      const dateDeadline = new Date(formData.get("deadline"));
      campaignData.deadline = Math.floor(dateDeadline.getTime() / 1000);

      try {
         console.log("Creating campaign...");

         const { contract } = await initializeContract();
         if (contract) {
            const txCampaign = await contract.createCampaign(campaignData.id, campaignData.title, campaignData.description, campaignData.totalTarget, campaignData.deadline, campaignData.photos);
            await txCampaign.wait();

            console.log("Campaign created");
            setForms({
               title: "",
               description: "",
               amount: "",
               deadline: new Date(Date.now() + 86400000),
            });
            setImages([]);
         }
      } catch (error) {
         if (campaignData.photos.length > 0) {
            try {
               console.log("Campaign creation failed. Deleting uploaded images...");
               await deleteImagesCampaign(null, campaignData.photos);
            } catch (deleteError) {
               console.error("Error deleting images:", deleteError);
            }
         }

         console.error("Error getting contract balance:", error);
      }
   };

   const handleSubmit = async formData => {
      try {
         setIsLoading(true);

         const uploadResult = await uploadImagesCampaign(null, images);

         if (uploadResult.error) {
            alert(`Upload failed: ${uploadResult.error}`);
            return;
         }

         await createCampaign(formData, uploadResult.imgUrls);
      } catch (error) {
         console.error("Error in handleSubmit:", error);
         alert("Something went wrong. Please try again.");
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <form action={handleSubmit}>
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

               <DropzoneInput setImages={setImages} imagesLength={images.length} />

               {images.length > 0 && (
                  <div className="flex space-x-4 mt-2">
                     {images.map((image, index) => (
                        <div key={index} className="relative py-2 w-56">
                           <button
                              type="button"
                              onClick={() => handleDeletePreview(index)}
                              className="absolute top-0 right-0 p-1 m-4 text-white rounded-full bg-gray-100/80 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-bg-gray-100/80 hover:bg-gray-100">
                              <X className="text-black w-8" />
                           </button>
                           <Image src={image.preview} width={128} height={128} alt={`image-preview-${index}`} className="w-56 h-56 object-cover rounded-md" />
                        </div>
                     ))}
                  </div>
               )}
            </div>
            <div className="flex justify-end mt-5">
               <Button color="light" isProcessing={isLoading} type="submit" className="border-none dark:hover:bg-slate-700 dark:bg-slate-800 max-w-28 md:max-w-32 w-full">
                  {isLoading ? "Creating..." : "Create"}
               </Button>
            </div>
         </div>
      </form>
   );
}
