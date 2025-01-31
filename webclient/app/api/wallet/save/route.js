import { openDB } from "@/lib/database.js";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { address } = await request.json();

  if (!address) {
    return NextResponse.json({ message: "Invalid address" }, { status: 400 });
  }

  try {
    const db = await openDB();

    const existingUser = await db.get("SELECT * FROM users WHERE address = ?", [
      address,
    ]);

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists", user: existingUser },
        { status: 200 }
      );
    }

    const dummyUsername = `user_${Date.now()}`;
    await db.run("INSERT INTO users (address, username) VALUES (?, ?)", [
      address,
      dummyUsername,
    ]);

    const newUser = await db.get("SELECT * FROM users WHERE address = ?", [
      address,
    ]);

    return NextResponse.json(
      { message: "User created", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database error", error);
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  }
}
