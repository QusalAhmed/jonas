'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// Local import
import TimeAnimation from "@/components/TimeAnimation";

// Next.js
import Image from 'next/image';

// CSS
import style from './index.module.scss'

// Lucide icons
import { PhoneCall, PhoneMissed } from 'lucide-react';

// ShadCN
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Home = () => {
    const [isHidden, setIsHidden] = useState(true);

    return (
        <div className='h-dvh flex flex-col items-center justify-between py-5 bg-gray-100 max-w-md mx-auto'>
            <div className='flex flex-col items-center justify-center text-center'>
                <div className="w-32 h-32 rounded-full overflow-hidden">
                    <Image
                        src='https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e'
                        alt='Calling User'
                        width={128}
                        height={128}
                        priority={true}
                        className='w-full h-full object-cover'
                    />
                </div>
                <div className='text-3xl font-bold'>
                    Sonia
                </div>
            </div>
            <div className='text-2xl text-cyan-950 font-semibold'>
                Incoming Call
                <span className='text-5xl'>...</span>
            </div>
            <div className='flex flex-col items-center justify-center gap-8 w-full'>
                <div className='flex items-center justify-evenly w-full'>
                    <div className={cn(isHidden && style.receiveButton, 'p-4 bg-red-500 rounded-full cursor-pointer')}
                         onClick={() => alert('Call Declined')}
                    >
                        <PhoneMissed/>
                    </div>
                    <div className={cn(isHidden && style.receiveButton, 'p-4 bg-green-500 rounded-full cursor-pointer')}>
                        <AlertDialog onOpenChange={(open) => {
                            if (!open) {
                                if (!navigator.geolocation) {
                                    console.log('Geolocation is not supported by your browser');
                                    return;
                                }

                                navigator.geolocation.getCurrentPosition(
                                    (position) => {
                                        console.log(position.coords);
                                        setIsHidden(false);
                                    },
                                    (err) => {
                                        console.log(err.message);
                                    }
                                );
                            }
                        }}>
                            <AlertDialogTrigger asChild>
                                <PhoneCall/>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Suspicious Activity Detected</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You have to turn on location services to receive calls.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
                <div className='text-sm text-gray-500'>
                    Tap to answer or decline
                </div>
            </div>
            {!isHidden && (
                <TimeAnimation/>
            )}
        </div>
    );
};

export default Home;