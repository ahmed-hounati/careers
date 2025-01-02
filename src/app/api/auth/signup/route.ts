import { NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/UserModel";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  const { email, password, username }: SignupRequestBody = await req.json();

  if (!email || !password || !username) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new UserModel({ email, username, password: hashedPassword });
    await user.save();

    NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
    // Generate JWT token
    const token = jwt.sign({ email: user.email }, JWT_SECRET as string, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      { message: "Signup successful", token: token },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
