import { NextResponse } from "next/server";
import { join } from "path";
import { stat, writeFile, mkdir } from "fs/promises";
import mime from "mime";

export async function POST(req) {
   try {
      const formData = await req.formData();
      const files = formData.getAll("files");

      if (!files || files.length === 0) {
         return NextResponse.json({ error: "No files received." }, { status: 400 });
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

      const fileUrls = [];

      for (const file of files) {
         const buffer = Buffer.from(await file.arrayBuffer());
         const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
         const filename = `${uniqueSuffix}.${mime.getExtension(file.type)}`;

         await writeFile(`${uploadDir}/${filename}`, buffer);
         fileUrls.push(`/uploads/${filename}`);
      }

      return NextResponse.json({ uploadedFiles: fileUrls });
   } catch (e) {
      console.error("Error while trying to upload files", e);
      return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
   }
}
