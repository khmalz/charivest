import { openDB } from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET(req) {
  const address = req.nextUrl.pathname.split("/").pop();

  if (!address) {
    return NextResponse.json(
      { message: "Address is required" },
      { status: 400 }
    );
  }

  try {
    const db = await openDB();
    const user = await db.get("SELECT * FROM users WHERE address = ?", [
      address,
    ]);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "User found",
        userId: user.id,
        username: user.username,
        email: user.email || null,
        bio: user.bio || null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Error fetching user data" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const { address, username, email, bio } = await req.json();

  if (!address || !username || !email) {
    return NextResponse.json(
      { message: "Address, username, and email are required" },
      { status: 400 }
    );
  }

  try {
    const db = await openDB();

    const existingUser = await db.get("SELECT * FROM users WHERE address = ?", [
      address,
    ]);

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await db.run(
      "UPDATE users SET username = ?, email = ?, bio = ? WHERE address = ?",
      [username, email, bio, address]
    );

    return NextResponse.json(
      { message: "User profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Error updating user profile" },
      { status: 500 }
    );
  }
}
