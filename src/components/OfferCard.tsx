import { OfferCardProps } from '@/types/offerProps'
import Link from 'next/link'
import React from 'react'

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
    return (
        <article key={offer.id} className="flex max-w-xl flex-col items-start justify-between">
            <div className="flex items-center gap-x-4 text-xs">
                <time className="text-white">
                    {offer.location}
                </time>
                <Link
                    href={`/offers/jobs/${offer.id}`}
                    className="relative z-10 rounded-full bg-gray-950 px-3 py-1.5 font-medium text-white hover:bg-gray-700"
                >
                    {offer.type}
                </Link>
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-white group-hover:text-gray-600">
                    <Link href={`/offers/jobs/${offer.id}`}>
                        <span className="absolute inset-0" />
                        {offer.title}
                    </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-white">{offer.description}</p>
            </div>
            <Link href={`/offers/jobs/${offer.id}`} className="rounded-xl bg-[#00b140] px-5 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                Apply
            </Link>
        </article>
    )
}

export default OfferCard;
