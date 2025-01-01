import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/UserModel";
import { POST } from "@/app/api/auth/signup/route";

// Mock dependencies
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("@/lib/mongodb");
jest.mock("@/models/UserModel");

describe("Signup API", () => {
  const mockEmail = "test@example.com";
  const mockPassword = "password123";
  const mockUsername = "testuser";
  const mockHashedPassword = "hashedpassword123";
  const mockToken = "mockjwttoken";

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "testsecret";
    (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);
    (connectDB as jest.Mock).mockResolvedValue(undefined);
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);
    (UserModel.prototype.save as jest.Mock).mockResolvedValue({});
  });

  it("should return 400 if required fields are missing", async () => {
    const mockRequestBody = {
      email: mockEmail,
      // password is missing
      username: mockUsername,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    const responseBody = await response.json();

    expect(response.status).toBe(400);
    expect(responseBody).toEqual({ message: "All fields are required" });
  });

  it("should return 409 if user already exists", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue({ email: mockEmail });

    const mockRequestBody = {
      email: mockEmail,
      password: mockPassword,
      username: mockUsername,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    const responseBody = await response.json();

    expect(response.status).toBe(409);
    expect(responseBody).toEqual({ message: "User already exists" });
  });

  it("should handle internal server errors", async () => {
    (UserModel.prototype.save as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    const mockRequestBody = {
      email: mockEmail,
      password: mockPassword,
      username: mockUsername,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({ message: "Internal server error" });
  });
});
