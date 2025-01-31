"use client";

import { DropzoneInput } from "@/components/ui/DropzoneInput";
import { Button, Datepicker, Label, Textarea, TextInput } from "flowbite-react";
import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

const datepickerTheme = {
   popup: {
      footer: {
         button: {
            today: "bg-primary text-white hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-primary",
         },
      },
   },
};

export default function DashboardCreateCampaign() {
   const [files, setFiles] = useState([]);

   const onDrop = useCallback(
      acceptedFiles => {
         if (acceptedFiles.length > 3 || files.length + acceptedFiles.length > 3) {
            alert("Anda hanya bisa meng-upload maksimal 3 file.");
            return;
         }

         const mappedFiles = acceptedFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
         }));
         setFiles(prev => [...prev, ...mappedFiles]);
      },
      [files.length]
   );

   const handleDelete = index => {
      setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
   };

   const thumbs = files.map((fileWrapper, index) => (
      <div key={index} className="relative py-2">
         <button type="button" onClick={() => handleDelete(index)} className="absolute top-0 right-0 p-1 m-4 text-white rounded-full bg-gray-100/80 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-bg-gray-100/80">
            <X className="text-black w-8" />
         </button>
         <Image src={fileWrapper.preview} width={128} height={128} alt={`image-preview-${index}`} className="w-56 h-56 object-cover rounded-md" />
      </div>
   ));

   return (
      <div>
         <h1 className="text-2xl font-bold">Create Campaign</h1>

         <div className="mt-5 w-full shadow-lg dark:bg-dashboardsecondary p-5 rounded-lg flex flex-col space-y-5">
            <div className="flex">
               <div className="w-full">
                  <form action="">
                     <div className="flex flex-col w-full mt-3 space-y-2">
                        <div className="grid sm:grid-cols-2 sm:gap-x-2 gap-y-2 sm:gap-y-0">
                           <div>
                              <div className="mb-2 block">
                                 <Label htmlFor="title" className="dark:text-white text-slate-800" value="Title" />
                              </div>
                              <TextInput id="title" type="text" />
                           </div>
                           <div>
                              <div className="mb-2 block">
                                 <Label htmlFor="deadline" className="dark:text-white text-slate-800" value="Deadline" />
                              </div>
                              <Datepicker language="id-ID" theme={datepickerTheme} labelTodayButton="Hari Ini" labelClearButton="Clear" minDate={new Date()} />
                           </div>
                        </div>
                        <div className="max-w-full">
                           <div className="mb-2 block">
                              <Label htmlFor="description" value="Description" className="dark:text-white text-slate-800" />
                           </div>
                           <Textarea id="description" placeholder="Leave a description..." required rows={4} />
                        </div>
                        <div>
                           <div className="mb-2 block">
                              <Label htmlFor="image" value="Image" className="dark:text-white text-slate-800" />
                           </div>

                           <DropzoneInput onDrop={onDrop} />

                           {files.length > 0 && <div className="grid grid-cols-3 space-x-2 mt-2">{thumbs}</div>}
                        </div>
                        <div className="flex justify-end mt-5">
                           <Button color="light" className="border-none dark:hover:bg-slate-700 dark:bg-slate-800 max-w-28 md:max-w-32 w-full">
                              Submit
                           </Button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}
