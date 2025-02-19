import { NextResponse } from "next/server";
import { join } from "path";
import { stat, writeFile, mkdir, unlink } from "fs/promises";
import mime from "mime";

export async function POST(req) {
   try {
      const formData = await req.formData();
      const images = formData.getAll("images");

      if (!images || images.length === 0) {
         return NextResponse.json({ error: "No images received." }, { status: 400 });
      }

      const uploadDir = join(process.cwd(), "public", "uploads");
      try {
         await stat(uploadDir);
      } catch (e) {
         if (e.code === "ENOENT") {
            await mkdir(uploadDir, { recursive: true });
         } else {
            console.error("Error while trying to create directory", e);
            return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
         }
      }

      const imageUrls = [];

      for (const image of images) {
         const buffer = Buffer.from(await image.arrayBuffer());
         const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
         const imagename = `${uniqueSuffix}.${mime.getExtension(image.type)}`;

         await writeFile(`${uploadDir}/${imagename}`, buffer);
         imageUrls.push(`/uploads/${imagename}`);
      }

      return NextResponse.json({ uploadedImages: imageUrls });
   } catch (e) {
      console.error("Error while trying to upload images", e);
      return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
   }
}

export async function DELETE(req) {
   try {
      const { imageUrls } = await req.json();

      if (!imageUrls || !Array.isArray(imageUrls)) {
         return NextResponse.json({ error: "Invalid request" }, { status: 400 });
      }

      for (const url of imageUrls) {
         const imagePath = join(process.cwd(), "public", url);
         await unlink(imagePath);
      }

      return NextResponse.json({ success: true }, { status: 200 });
   } catch (error) {
      console.error("Error deleting images:", error);
      return NextResponse.json({ error: "Failed to delete images" }, { status: 500 });
   }
}
