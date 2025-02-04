import { openDB } from "@/lib/database";
import { NextResponse } from "next/server";

export async function PUT(req) {
   const { address, username } = await req.json();

   if (!address || !username) {
      return NextResponse.json({ message: "Address, and username are required" }, { status: 400 });
   }

   try {
      const db = await openDB();

      const existingUser = await db.get("SELECT * FROM users WHERE address = ?", [address]);

      if (!existingUser) {
         return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      await db.run("UPDATE users SET username = ? WHERE address = ?", [username, address]);

      const updatedUser = await db.get("SELECT * FROM users WHERE address = ?", [address]);

      return NextResponse.json({ message: "User profile updated successfully", data: { address: updatedUser.address, username: updatedUser.username } }, { status: 200 });
   } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: "Error updating user profile" }, { status: 500 });
   }
}
