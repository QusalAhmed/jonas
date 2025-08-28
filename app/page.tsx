import React from 'react';
import Link from 'next/link';

// Components
import CTA from "@/components/CTA";
import Users from "@/components/Users";
import Post from "@/components/Post";
import Counter from "@/components/counter";
import Country from "@/lib/features/country/Country"

// ShadCN
import { Button } from "@/components/ui/8bit/button";
// import Footer4Col from "@/components/ui/footer-column";


const App = () => {
    return (
        <>
            <CTA/>
            <div className='flex flex-row items-center justify-center mt-4'>
                <Button asChild>
                    <Link href="/call">Calling</Link>
                </Button>
            </div>
            <Country/>
            <Users/>
            <Post/>
            <Counter/>
            {/*<Footer4Col/>*/}
        </>
    );
};

export default App;