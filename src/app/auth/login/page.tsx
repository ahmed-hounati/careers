"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const validateInputs = (): boolean => {
        if (!email || !password) {
            setError("Both email and password are required.");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return false;
        }
        return true;
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        if (!validateInputs()) {
            setLoading(false);
            return;
        }

        try {
            await axios.post("/api/auth/login", {
                email,
                password,
            });

            setMessage("Login successful!");
            setError("");
            router.push("/dashboard");
        } catch (err: unknown) {
            console.error(err);
            setError(
                axios.isAxiosError(err) && err.response?.data?.message
                    ? err.response.data.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="mx-auto p-8 flex h-[100vh] w-full items-center justify-center text-white bg-[#141A28]">
            <section className="flex w-[30rem] flex-col space-y-10 overflow-hidden">
                <div className="text-center text-4xl font-medium">Log In</div>

                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                {message && (
                    <div className="text-green-500 text-sm text-center">{message}</div>
                )}

                <form className="flex flex-col gap-7" onSubmit={handleLogin}>
                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#00b140]">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#00b140]">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`transform rounded-sm py-2 font-bold duration-300 ${loading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-[#00b140] hover:bg-[#409C3E]"
                            }`}
                    >
                        {loading ? "Logging in..." : "LOG IN"}
                    </button>
                </form>
                <div className="flex flex-row justify-end items-center">
                    <p>D ont have an account ?</p>
                    <Link href={"signup"} className="text-[#00b140]">
                        SignUp
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default LoginPage;
