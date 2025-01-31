import { NextResponse } from "next/server";
import { openDB } from "@/lib/database";
import { hashPassword, generateToken } from "@/utils/authUtils";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
      address,
      phone_number,
      tier,
      role,
      documentType,
      documentNumber,
      documentImage,
    } = body;

    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !tier ||
      !documentType ||
      !documentNumber ||
      !documentImage
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const db = await openDB();

    const user = await db.run(
      `INSERT INTO users (address, username, email, password, phone_number, tier, role) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [address, name, email, hashedPassword, phone_number, tier, role || "user"]
    );

    const userId = user.lastID;

    await db.run(
      `INSERT INTO documents (user_id, document_type, document_number, document_image, is_verified) 
       VALUES (?, ?, ?, ?, ?)`,
      [userId, documentType, documentNumber, documentImage, false]
    );

    const token = generateToken(userId, email);

    return NextResponse.json(
      { message: "User registered successfully", token },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error registering user", details: error.message },
      { status: 500 }
    );
  }
}
