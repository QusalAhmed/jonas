'use client';
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export function Providers({children}: {children: React.ReactNode}) {
    // Create one QueryClient per browser session
    const [queryClient] = React.useState(() => new QueryClient());
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}