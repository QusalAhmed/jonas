import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export default function TimeAnimation() {
    useEffect(() => {
        fetch('https://lottie.host/019af30b-ea74-4a62-833e-1883c753cb22/2yH82otcn5.lottie')
            .then(res => console.log('Lottie file fetched successfully:', res))
            .catch(err => console.error('Error fetching Lottie file:', err));
    }, []);

    return (
        <>
            {createPortal(
                <div className="fixed inset-0 flex items-center justify-center bg-[#daf0ec8f] z-50">
                    <div className={'flex flex-col items-center justify-center'}>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 animate-pulse">
                            Connecting Your Call
                        </h2>
                        <DotLottieReact
                            className="w-64 h-auto"
                            src="https://lottie.host/019af30b-ea74-4a62-833e-1883c753cb22/2yH82otcn5.lottie"
                            loop
                            autoplay
                        />
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
