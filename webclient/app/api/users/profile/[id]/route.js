import { NextResponse } from "next/server";
import { openDB } from "@/lib/database";
import { verifyToken } from "@/middleware/authMiddleware";

export const GET = verifyToken(async (req) => {
  const id = req.nextUrl.pathname.split("/").pop();

  try {
    const db = await openDB();
    const user = await db.get("SELECT * FROM users WHERE id = ?", [id]);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching user data" },
      { status: 500 }
    );
  }
});
