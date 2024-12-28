"use client";
import React from "react";
import jobOffers from "@/json/jobs.json";
import OfferCard from "@/components/OfferCard";

const Page: React.FC = () => {
    return (
        <div className="p-8 bg-[#141A28]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobOffers.map((offer) => (
                    <OfferCard offer={offer} />
                ))}
            </div>
        </div >
    );
};

export default Page;
