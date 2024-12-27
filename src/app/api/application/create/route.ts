import { connectDB } from "@/lib/mongodb";
import ApplicationModel from "@/models/ApplicationModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JwtPayload } from "@/types/jwt/jwtPayload";
import UserModel from "@/models/UserModel";
import { Types } from "mongoose";

interface ApplicationBody {
  jobId: number;
  userId: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  const { jobId }: ApplicationBody = await req.json();
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("Authorization header missing or malformed");
    return NextResponse.json(
      { message: "all felids are required" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const userId = decoded.userId;
    if (!jobId || !userId) {
      return NextResponse.json(
        { message: "all felids are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const application = await ApplicationModel.find({ jobId, userId });
    if (!application) {
      return NextResponse.json(
        {
          message: "You are already applied to this job",
        },
        { status: 400 }
      );
    }

    const newApp = new ApplicationModel({ jobId, userId });
    newApp.save();

    return NextResponse.json(
      { message: "job applied successfully" },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
