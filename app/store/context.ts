import { createContext } from 'react';

export const AppContext = createContext<{
    data: {courierName: string, count: number}[], isLoading: boolean
}>({
    data: [{courierName: 'Steadfast', count: 0}],
    isLoading: true,
});