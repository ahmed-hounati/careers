"use client";
import jobOffers from "@/json/jobs.json";
import { Offer } from "@/types/offer";
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert } from "flowbite-react";

const JobDetails = ({ params }: { params: { id: number } }) => {
    const [letter, setLetter] = useState<string>("");
    const [cv, setCv] = useState<File | null>(null);
    const [token, setToken] = useState<string | undefined>(undefined);
    const [message, setMessage] = useState<string>("");
    const [alertClass, setAlertClass] = useState<string>("");

    const router = useRouter();

    const offerId = params.id;
    const offer: Offer | undefined = jobOffers.find((job) => job.id == offerId);

    if (!offer) {
        return <p className="text-center text-red-500">Offer not found!</p>;
    }

    useEffect(() => {
        const tokenValue = Cookie.get("token");
        setToken(tokenValue);
        const token = Cookie.get("token");
        if (!token) {
            router.push("/auth/login");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!cv || !letter.trim()) {
            setMessage("Please fill in all fields!");
            setAlertClass("bg-red-500 text-white p-3 rounded-md");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("cv", cv);
            formData.append("letter", letter);
            formData.append("jobId", offerId !== null ? offerId.toString() : "");

            const response = await axios.post(
                "/api/application/create",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 201) {
                setAlertClass("bg-green-500 text-white p-3 rounded-md")
                setMessage("Application submitted successfully!");
                setTimeout(() => router.push("/offers/jobs"), 2000);
            } else {
                setAlertClass("bg-red-500 text-white p-3 rounded-md");
                setMessage(response.data.message || "An error occurred.");
            }
        } catch (error) {
            setAlertClass("bg-red-500 text-white p-3 rounded-md");
            setMessage("Failed to submit application. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#141A28] text-white flex flex-col md:flex-row p-6 gap-8">
            {/* Alert Section */}
            {message && (
                <div className={`absolute bottom-10 ${alertClass}`}>
                    <Alert
                        onDismiss={() => setMessage("")}
                    >
                        <span className="font-medium">{message}</span>
                    </Alert>
                </div>
            )}

            {/* Left Section: Job Details */}
            <div className="flex-1">
                {/* Job Title */}
                <h1 className="text-3xl font-bold mb-4 text-[#00b140]">{offer.title}</h1>

                {/* Job Metadata */}
                <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                    <span>{offer.location}</span>
                    <span>•</span>
                    <span>Plus de 100 candidats</span>
                </div>

                {/* Job Type */}
                <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-[#00b140] text-white rounded-full text-sm font-medium">
                        {offer.type}
                    </span>
                </div>

                {/* Requirements */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-[#00b140]">Requirements:</h2>
                    <ul className="list-disc pl-6 text-gray-300">
                        {Array.isArray(offer.requirements)
                            ? offer.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))
                            : <li>{offer.requirements}</li>}
                    </ul>
                </div>

                {/* Company Name */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-[#00b140]">Company:</h2>
                    <p className="text-gray-300">{offer.company}</p>
                </div>

                {/* Job Description */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-[#00b140]">Description:</h2>
                    <p className="text-gray-300">{offer.description}</p>
                </div>

                {/* Salary (if available) */}
                {offer.salary && (
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-[#00b140]">Salary:</h2>
                        <p className="text-gray-300">{offer.salary}</p>
                    </div>
                )}

                {/* Posted Date */}
                <div className="text-sm text-gray-400">
                    <span>Posted on: {new Date(offer.postedAt).toLocaleDateString()}</span>
                </div>
            </div>

            {/* Right Section: Form */}
            <div className="flex-1 bg-[#1A2234] p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-[#00b140] mb-4">Apply Now</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* CV Input */}
                    <div>
                        <label htmlFor="cv" className="block text-sm text-gray-400 mb-1">
                            Upload CV:
                        </label>
                        <input
                            type="file"
                            id="cv"
                            name="cv"
                            accept=".pdf,.doc,.docx"
                            className="block w-full text-sm text-gray-300 bg-[#141A28] border border-gray-600 rounded-lg p-2"
                            onChange={(e) => setCv(e.target.files ? e.target.files[0] : null)}
                        />
                    </div>

                    {/* Cover Letter Input */}
                    <div>
                        <label
                            htmlFor="coverLetter"
                            className="block text-sm text-gray-400 mb-1"
                        >
                            Cover Letter:
                        </label>
                        <textarea
                            id="coverLetter"
                            name="coverLetter"
                            rows={14}
                            placeholder="Write your cover letter here..."
                            className="block w-full text-sm text-gray-300 bg-[#141A28] border border-gray-600 rounded-lg p-3"
                            value={letter}
                            onChange={(e) => setLetter(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#00b140] text-white py-2 rounded-lg font-medium hover:bg-[#009e38] transition duration-200"
                    >
                        Submit Application
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JobDetails;
