import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JwtPayload } from "@/types/jwt/jwtPayload";
import ApplicationModel from "@/models/ApplicationModel";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: Request) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization header missing or malformed" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted Token:", token); // Debugging token

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded || typeof decoded !== "object") {
      throw new Error("Invalid token payload");
    }

    const { userId } = decoded as JwtPayload;

    // Connect to MongoDB
    await connectDB();

    // Fetch applications
    const applications = await ApplicationModel.find({ userId }).lean();

    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error("JWT Verification or DB Error:", error);
    return NextResponse.json(
      { message: "Invalid token or internal server error" },
      { status: 500 }
    );
  }
}
