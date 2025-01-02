import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import ApplicationModel from "@/models/ApplicationModel";
import minioClient from "@/config/Minio";
import { POST } from "@/app/api/application/create/route";

// Mock dependencies

// Mock the File API
global.File = class File {
  name: string;
  lastModified: number;
  size: number;
  type: string;
  constructor(parts: string[], name: string, options: { type: string }) {
    this.name = name;
    this.type = options.type;
    this.size = parts.reduce((acc, part) => acc + part.length, 0);
    this.lastModified = Date.now();
  }
} as unknown as typeof File;

jest.mock("next/server", () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: jest.fn().mockImplementation((body, init) => ({
      status: init?.status || 200,
      json: () => Promise.resolve(body),
    })),
  },
}));

jest.mock("jsonwebtoken");
jest.mock("@/lib/mongodb");
jest.mock("@/models/ApplicationModel");
jest.mock("@/config/Minio");

describe("Application API - Apply", () => {
  const mockUserId = "user123";
  const mockToken = "mock-token";
  const mockJobId = "12345";
  const mockLetter = "Cover letter content";
  const mockCvFile = new File(["mock cv content"], "cv.pdf", {
    type: "application/pdf",
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (jwt.verify as jest.Mock).mockReturnValue({ userId: mockUserId });
    (connectDB as jest.Mock).mockResolvedValue(undefined);
    (ApplicationModel.findOne as jest.Mock).mockResolvedValue(null);
    (ApplicationModel.prototype.save as jest.Mock).mockResolvedValue({});
    (minioClient.bucketExists as jest.Mock).mockResolvedValue(true);
    (minioClient.putObject as jest.Mock).mockResolvedValue({});
  });

  // it("should successfully submit an application", async () => {
  //   const formData = new FormData();
  //   formData.append("jobId", mockJobId);
  //   formData.append("cv", mockCvFile);
  //   formData.append("letter", mockLetter);

  //   const mockRequest = {
  //     headers: new Headers({
  //       Authorization: `Bearer ${mockToken}`,
  //     }),
  //     formData: () => Promise.resolve(formData),
  //   } as unknown as NextRequest;

  //   const response = await POST(mockRequest);
  //   const responseBody = await response.json();

  //   expect(response.status).toBe(201);
  //   expect(responseBody).toEqual({ message: "Job applied successfully" });
  //   expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.JWT_SECRET);
  //   expect(ApplicationModel.findOne).toHaveBeenCalledWith({
  //     jobId: Number(mockJobId),
  //     userId: mockUserId,
  //   });
  //   expect(minioClient.putObject).toHaveBeenCalled();
  //   expect(ApplicationModel.prototype.save).toHaveBeenCalled();
  // });

  it("should fail when user has already applied", async () => {
    (ApplicationModel.findOne as jest.Mock).mockResolvedValue({
      _id: "existingApplicationId",
    });

    const formData = new FormData();
    formData.append("jobId", mockJobId);
    formData.append("cv", mockCvFile);
    formData.append("letter", mockLetter);

    const mockRequest = {
      headers: new Headers({
        Authorization: `Bearer ${mockToken}`,
      }),
      formData: () => Promise.resolve(formData),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    const responseBody = await response.json();

    expect(response.status).toBe(400);
    expect(responseBody).toEqual({
      message: "You have already applied for this job",
    });
  });

  it("should fail when missing required fields", async () => {
    const formData = new FormData();
    formData.append("jobId", mockJobId);
    // Missing CV file

    const mockRequest = {
      headers: new Headers({
        Authorization: `Bearer ${mockToken}`,
      }),
      formData: () => Promise.resolve(formData),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    const responseBody = await response.json();

    expect(response.status).toBe(400);
    expect(responseBody).toEqual({
      message: "All fields are required, including CV",
    });
  });

  it("should fail when no authorization token is provided", async () => {
    const mockRequest = {
      headers: new Headers({}),
      formData: () => Promise.resolve(new FormData()),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    const responseBody = await response.json();

    expect(response.status).toBe(401);
    expect(responseBody).toEqual({
      message: "Authorization header missing or malformed",
    });
  });

});
