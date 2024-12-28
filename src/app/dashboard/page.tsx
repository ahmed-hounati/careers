"use client";
import React from "react";
import Link from "next/link";

const Dashboard: React.FC = () => {
    return (
        <section className="text-white h-[100vh] p-5 bg-[#141A28]">
            <h1 className="text-3xl text-center font-bold pt-10">Dashboard</h1>
            <div className="flex flex-col md:flex-row items-center justify-center py-10 gap-10 md:gap-20 pt-[100px]">
                <Link href="/offers/jobs" className="w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] bg-slate-700 flex flex-col gap-7 items-center justify-center rounded-xl transition-transform duration-500 hover:scale-105 hover:-translate-y-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="120"
                        width="150"
                        viewBox="0 0 448 512"
                    ><path fill="#00b140" d="M184 48l144 0c4.4 0 8 3.6 8 8l0 40L176 96l0-40c0-4.4 3.6-8 8-8zm-56 8l0 40L64 96C28.7 96 0 124.7 0 160l0 96 192 0 128 0 192 0 0-96c0-35.3-28.7-64-64-64l-64 0 0-40c0-30.9-25.1-56-56-56L184 0c-30.9 0-56 25.1-56 56zM512 288l-192 0 0 32c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-32L0 288 0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-128z" /></svg>
                    <p className="text-2xl">Job Offers</p>
                </Link>
                <Link href="/offers/accepted" className="w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] bg-slate-700 flex flex-col gap-7 items-center justify-center rounded-xl transition-transform duration-500 hover:scale-105 hover:-translate-y-2">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        height="120"
                        width="150"
                        viewBox="0 0 448 512"
                    ><path fill="#00b141" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" /></svg>
                    <p className="text-2xl">Apply Accepting</p>
                </Link>
            </div>
        </section>
    );
};

export default Dashboard;
