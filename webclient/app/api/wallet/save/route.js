import { openDB } from "@/lib/database";
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
        {
          message: "User already exists",
          userId: existingUser.id,
          username: existingUser.username,
          email: existingUser.email || null,
          bio: existingUser.bio || null,
        },
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
      { message: "User created", userId: newUser.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  }
}

export async function PUT(request) {
  const { address } = await request.json();
  const { username, email, bio } = request.json();

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
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await db.run(
      "UPDATE users SET username = ?, email = ?, bio = ? WHERE address = ?",
      [username, email, bio, address]
    );

    return NextResponse.json(
      { message: "User profile updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  }
}
