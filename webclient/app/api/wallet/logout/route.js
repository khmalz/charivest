import { verifySession } from "@/app/_lib/dal";
import { deleteSession } from "@/app/_lib/session";
import { NextResponse } from "next/server";

export async function POST() {
   try {
      const session = await verifySession();

      if (!session.isAuth) {
         return NextResponse.json({ message: "Unauthorized" }, { status: 200 });
      }

      await deleteSession();

      return NextResponse.json({ message: "Logout successful" }, { status: 200 });
   } catch (error) {
      console.error("Logout error:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
   }
}
