import { connectDB } from "@/lib/mongodb";
import ApplicationModel from "@/models/ApplicationModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JwtPayload } from "@/types/jwt/jwtPayload";
import minioClient from "@/config/Minio";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request): Promise<NextResponse> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization header missing or malformed" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const userId = decoded.userId;

    const formData = await req.formData();
    const jobId = Number(formData.get("jobId"));
    const cvFile = formData.get("cv") as File | null;

    if (!jobId || !userId || !cvFile) {
      return NextResponse.json(
        { message: "All fields are required, including CV" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if the user already applied
    const existingApplication = await ApplicationModel.findOne({
      jobId,
      userId,
    });
    if (existingApplication) {
      return NextResponse.json(
        { message: "You have already applied for this job" },
        { status: 400 }
      );
    }

    // Upload CV to MinIO
    const bucketName = "job-applications";
    const objectName = `cv-${uuidv4()}-${cvFile.name}`;

    // Ensure the bucket exists
    const bucketExists = await minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      await minioClient.makeBucket(bucketName, "us-east-1");
    }

    // Convert the CV file to a buffer
    const cvBuffer = Buffer.from(await cvFile.arrayBuffer());

    // Upload to MinIO
    await minioClient.putObject(bucketName, objectName, cvBuffer);

    // Create the new job application
    const application = new ApplicationModel({
      jobId,
      userId,
      cvUrl: `${process.env.MINIO_BASE_URL}/${bucketName}/${objectName}`,
    });

    await application.save();

    return NextResponse.json(
      { message: "Job applied successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
