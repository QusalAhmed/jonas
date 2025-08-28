'use client'
import React from 'react';

// Redux
import { useAppSelector } from "@/lib/hooks";
import type { RootState } from '@/lib/store'

// NextJS
import Link from 'next/link'

// Icons
import { CornerDownLeft } from 'lucide-react'

const Country = () => {
    const country = useAppSelector((state: RootState) => state.country.country);

    return (
        <div className="flex flex-row items-center justify-center h-20">
            <h1 className={'font-semibold'} key={country.id}>{country.countryName}</h1>
            <Link href="/" className={'ml-4'}>
                <CornerDownLeft/>
            </Link>
        </div>
    );
};

export default Country;