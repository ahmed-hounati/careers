"use client";
import React, { useState } from "react";
import jobOffers from "@/json/jobs.json";
import OfferCard from "@/components/OfferCard";

const Page: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
    const filteredJobOffers = jobOffers.filter((offer) => {
        const matchesType = selectedType ? offer.type === selectedType : true;
        const matchesQuery = searchQuery
            ? offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            offer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            offer.description.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

        return matchesType && matchesQuery;
    });

    return (
        <div className="bg-[#141A28] py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <form className="max-w-lg mx-auto ">
                        <div className="flex">
                            {/* Dropdown for filtering by type */}
                            <select
                                id="dropdown"
                                className="z-10 bg-gray-600 divide-y divide-gray-100 text-white rounded-l-lg px-3 shadow w-44 dark:bg-gray-700"
                                value={selectedType}
                                onChange={handleTypeChange}
                            >
                                <option value="">All Types</option>
                                {[...new Set(jobOffers.map((offer) => offer.type))].map(
                                    (type, index) => (
                                        <option key={index} value={type}>
                                            {type}
                                        </option>
                                    )
                                )}
                            </select>
                            {/* Search input */}
                            <div className="relative w-full">
                                <input
                                    type="search"
                                    id="search-dropdown"
                                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-600 rounded-e-lg border-s-gray-600 border-s-2 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                    placeholder="Search by title, company, or description..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                                <button
                                    type="button"
                                    className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#00b140] rounded-e-lg border border-[#00b140] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <svg
                                        className="w-4 h-4"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {/* Display filtered offers */}
                    {filteredJobOffers.length > 0 ? (
                        filteredJobOffers.map((offer) => (
                            <OfferCard key={offer.id} offer={offer} />
                        ))
                    ) : (
                        <p className="text-center text-white">No job offers found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;