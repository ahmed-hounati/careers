import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/UserModel";
import { POST } from "@/app/api/auth/login/route";

const originalEnv = process.env;

beforeAll(() => {
  jest.resetModules();
  process.env = { ...originalEnv, JWT_SECRET: "testsecret" };
});

afterAll(() => {
  process.env = originalEnv;
});

// Mock dependencies
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("@/lib/mongodb");
jest.mock("@/models/UserModel");

describe("Login API", () => {
  const mockEmail = "test@example.com";
  const mockPassword = "password123";
  const mockUserId = "user123";
  const mockHashedPassword = "hashedpassword123";
  const mockToken = "mockjwttoken";

  beforeEach(() => {
    jest.clearAllMocks();
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);
    (connectDB as jest.Mock).mockResolvedValue(undefined);
    (UserModel.findOne as jest.Mock).mockResolvedValue({
      _id: mockUserId,
      email: mockEmail,
      password: mockHashedPassword,
    });
  });

  it("should return 400 if email or password is missing", async () => {
    const mockRequestBody = {
      email: mockEmail,
      // password is missing
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    const responseBody = await response.json();

    expect(response.status).toBe(400);
    expect(responseBody).toEqual({
      message: "Email and password are required",
    });
  });

  it("should return 401 if user is not found", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);

    const mockRequestBody = {
      email: mockEmail,
      password: mockPassword,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    const responseBody = await response.json();

    expect(response.status).toBe(401);
    expect(responseBody).toEqual({ message: "Invalid email or password" });
  });

  it("should return 401 if password is invalid", async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const mockRequestBody = {
      email: mockEmail,
      password: mockPassword,
    };

    const mockRequest = {
      json: jest.fn().mockResolvedValue(mockRequestBody),
    } as unknown as NextRequest;

    const response = await POST(mockRequest);
    const responseBody = await response.json();

    expect(response.status).toBe(401);
    expect(responseBody).toEqual({ message: "Invalid email or password" });
  });

  it("should handle internal server errors", async () => {
    (UserModel.findOne as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    const mockRequestBody = {
      email: mockEmail,
      password: mockPassword,
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
