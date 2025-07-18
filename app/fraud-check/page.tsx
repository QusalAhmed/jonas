'use client';
import React, { useContext, useState } from 'react';

// Local import
import { AppContext } from '../store/context';

// ShadCN
import { Button } from "@/components/ui/button"

// Icon
import { Loader } from "lucide-react"

function TotalResults() {
    const resultContext = useContext(AppContext);

    return (
        <div className={'bg-emerald-50 p-4 rounded-lg shadow-md'}>
            <h2 className={'text-center text-xl font-bold'}>Total Results</h2>
            {resultContext.isLoading ? (
                <div className="flex justify-center items-center py-6">
                    <Loader className="animate-[spin_2s_ease-in-out_infinite]" size={48} color={'#363a31'}/>
                </div>
            ) : (
                <p className="text-center text-4xl font-semibold text-emerald-500">
                    {resultContext.data.reduce((acc, obj) => acc + obj.count, 0)}
                </p>
            )}
        </div>
    )
}

function IndividualResults() {
    const resultContext = useContext(AppContext);

    return (
        <div className={'bg-emerald-50 p-4 rounded-lg shadow-md w-full md:w-1/2'}>
            <h2 className={'text-center text-xl font-bold'}>Total Results</h2>
            {resultContext.isLoading ? (
                <div className="flex justify-center items-center py-6">
                    <Loader className="animate-[spin_2s_ease-in-out_infinite]" size={48} color={'#363a31'}/>
                </div>
            ) : (
                resultContext.data.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2">
                        {resultContext.data.map((object) => (
                            <li key={object.courierName} className="py-1 px-4 rounded-lg shadow-md bg-[#34e4ed]">
                                {object.courierName}: {object.count}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No results found.</p>
                )
            )}
        </div>
    )
}

const App = () => {
    const [contextData, setContextData] = useState({data: [{courierName: '', count: 0}], isLoading: true});

    return (
        <AppContext value={contextData}>
            <div className={'flex flex-row justify-center items-start gap-4 m-2'}>
                <TotalResults/>
                <IndividualResults/>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:flex-row">
                <Button className={'cursor-pointer'}
                        onClick={() => {
                            console.log('Loading data...');
                            setTimeout(() => {
                                console.log('Data loaded');
                                setContextData(
                                    {
                                        data: [
                                            {courierName: 'Steadfast', count: Math.floor(Math.random() * 100)},
                                            {courierName: 'Courier Express', count: Math.floor(Math.random() * 50)},
                                            {courierName: 'Fast Delivery', count: Math.floor(Math.random() * 70)},
                                            {courierName: 'Quick Ship', count: Math.floor(Math.random() * 80)},
                                            {courierName: 'Speedy Logistics', count: Math.floor(Math.random() * 30)},
                                        ],
                                        isLoading: false,
                                    }
                                );
                            }, 500);
                        }}>
                    Load
                </Button>
            </div>
        </AppContext>
    );
};

export default App;