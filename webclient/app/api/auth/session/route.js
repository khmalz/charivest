import { verifySession } from "@/app/_lib/dal";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const session = await verifySession();

      if (!session.isAuth) {
         return NextResponse.json({ isAuth: false, message: "Unauthorized" }, { status: 200 });
      }

      return NextResponse.json({ isAuth: true, address: session.address }, { status: 200 });
   } catch (error) {
      console.error("Session verification error:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
   }
}
