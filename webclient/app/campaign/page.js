"use client";

import { DropzoneInput } from "@/components/ui/DropzoneInput";
import { Datepicker, Label, Textarea, TextInput } from "flowbite-react";
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

export default function Campaign() {
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
         <section id="create">
            <h2 className="text-center text-2xl font-bold text-white sm:text-3xl mt-24">Create Campaign</h2>

            <div className="flex justify-center">
               <div className="w-full max-w-3xl p-3">
                  <form action="">
                     <div className="flex flex-col w-full mt-3 gap-y-2">
                        <div className="grid grid-cols-2 space-x-2">
                           <div>
                              <div className="mb-2 block">
                                 <Label htmlFor="title" className="text-white" value="Title" />
                              </div>
                              <TextInput id="title" type="text" />
                           </div>
                           <div>
                              <div className="mb-2 block">
                                 <Label htmlFor="deadline" className="text-white" value="Deadline" />
                              </div>
                              <Datepicker language="id-ID" theme={datepickerTheme} labelTodayButton="Hari Ini" labelClearButton="Clear" minDate={new Date()} />
                           </div>
                        </div>
                        <div className="max-w-full">
                           <div className="mb-2 block">
                              <Label htmlFor="description" value="Description" className="text-white" />
                           </div>
                           <Textarea id="description" placeholder="Leave a description..." required rows={4} />
                        </div>
                        <div>
                           <div className="mb-2 block">
                              <Label htmlFor="image" value="Image" className="text-white" />
                           </div>

                           <DropzoneInput onDrop={onDrop} />

                           {files.length > 0 && <div className="grid grid-cols-3 space-x-2 mt-2">{thumbs}</div>}
                        </div>
                        <div>
                           <button type="submit" className="px-3 py-1.5 mt-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg round hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                              Submit
                           </button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </section>
      </div>
   );
}
