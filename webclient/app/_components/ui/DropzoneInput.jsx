"use client";

import { useDropzone } from "react-dropzone";
import { Label } from "flowbite-react";
import { useCallback } from "react";

export function DropzoneInput({ id, imagesLength, setImages, ...props }) {
   const onDrop = useCallback(
      acceptedImages => {
         if (acceptedImages.length > 3 || imagesLength + acceptedImages.length > 3) {
            alert("Anda hanya bisa meng-upload maksimal 3 image.");
            return;
         }

         const mappedImages = acceptedImages.map(image => ({
            image,
            preview: URL.createObjectURL(image),
         }));
         setImages(prev => [...prev, ...mappedImages]);
      },
      [imagesLength]
   );

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: { "image/*": [".jpeg", ".jpg", ".png"] },
      multiple: true,
   });

   return (
      <div className="flex w-full items-center justify-center">
         <div
            {...getRootProps()}
            className={`flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 ${
               isDragActive ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-700" : "border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            }`}>
            <Label
               htmlFor="dropzone-file"
               className="flex h-64 w-full cursor-pointer text-center flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
               <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                     <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                     />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                     <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">SVG, PNG, or JPG (MAX. 3 images)</p>
               </div>
            </Label>
            <input id={id} {...getInputProps()} {...props} className="hidden" />
         </div>
      </div>
   );
}
