"use client"
import jobOffers from "@/json/jobs.json";
import { Offer } from "@/types/offer";

const JobDetails = ({ params }: { params: { id: number } }) => {
    const offerId = params.id
    

    const offer: Offer | undefined = jobOffers.find((job) => job.id == offerId);

    if (!offer) {
        return <p>Offer not found!</p>;
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-zinc-700 border border-zinc-700 rounded-lg shadow">
            <h1 className="text-3xl font-bold text-white">{offer.title}</h1>
            <p className="text-sm text-gray-400">Posted at: {offer.postedAt}</p>
            <p className="text-lg text-gray-200">{offer.description}</p>
            <ul className="mt-4 text-gray-300">
                {offer.requirements.map((req, index) => (
                    <li key={index}>- {req}</li>
                ))}
            </ul>
            <p className="text-lg text-white mt-4">
                <strong>Company:</strong> {offer.company}
            </p>
            <p className="text-lg text-white">
                <strong>Location:</strong> {offer.location}
            </p>
            <p className="text-lg text-white">
                <strong>Salary:</strong> {offer.salary}
            </p>
        </div>
    );
};

export default JobDetails;


