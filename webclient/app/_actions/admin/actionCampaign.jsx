"use server";

export const uploadImagesCampaign = async (prevState, images) => {
   try {
      const formData = new FormData();
      images.forEach(imageWrap => formData.append("images", imageWrap.image));

      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/campaign/images", {
         method: "POST",
         body: formData,
      });

      if (!response.ok) {
         throw new Error(`Upload failed with status ${response.status}`);
      }

      const result = await response.json();

      if (!result.uploadedImages || !Array.isArray(result.uploadedImages)) {
         throw new Error("Invalid response format: missing 'uploadedImages'");
      }

      return { ...prevState, message: "Success upload images", imgUrls: result.uploadedImages, error: null };
   } catch (error) {
      console.error("Upload error:", error.message || error);

      return {
         ...prevState,
         message: "Failed to upload images",
         imgUrls: [],
         error: error.message || "Upload failed",
      };
   }
};

export const deleteImagesCampaign = async (prevState, imageUrls) => {
   if (!imageUrls || imageUrls.length === 0) {
      console.warn("No images to delete.");
      return { ...prevState, message: "No images to delete", error: null };
   }

   try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/campaign/images", {
         method: "DELETE",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ imageUrls }),
      });

      if (!response.ok) {
         throw new Error(`Request failed with status ${response.status}`);
      }

      return { ...prevState, message: "Success delete images", error: null };
   } catch (error) {
      console.error("Request failed:", error);
      return { ...prevState, message: "Failed to delete images", error: error.message || "Unexpected error" };
   }
};
