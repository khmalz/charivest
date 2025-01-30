import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function verifyToken(handler) {
  return async function (req) {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Access denied" }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, "secret");
      req.user = decoded;

      return handler(req);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  };
}
