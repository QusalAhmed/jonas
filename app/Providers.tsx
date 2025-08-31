'use client';
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export function Providers({children}: {children: React.ReactNode}) {
    // Create one QueryClient per browser session with sensible defaults
    const [queryClient] = React.useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 min
                gcTime: 5 * 60 * 1000, // 5 mins
                refetchOnWindowFocus: false,
                retry: 1,
            },
        },
    }));
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}