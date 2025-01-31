import { NextResponse } from "next/server";
import { openDB } from "@/lib/database";
import { verifyToken } from "@/middleware/authMiddleware";

export const GET = verifyToken(async function GET(req) {
  try {
    const db = await openDB();
    const users = await db.all("SELECT * FROM users");

    if (!users.length) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching users data" },
      { status: 500 }
    );
  }
});
