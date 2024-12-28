import { OfferCardProps } from '@/types/offerProps'
import Link from 'next/link'
import React from 'react'

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
    return (
        <div className="max-w-sm p-6 bg-zinc-700 border border-zinc-700 rounded-lg shadow">
            <Link href={`jobs/${offer.id}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {offer.title}
                </h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {offer.description}
            </p>
            <Link
                href={`jobs/${offer.id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#00B141] rounded-lg hover:bg-[#00B141] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#00B141] dark:hover:bg-[#00B141] dark:focus:ring-[#00B141]"
            >
                Read more
            </Link>
        </div>
    )
}

export default OfferCard;
