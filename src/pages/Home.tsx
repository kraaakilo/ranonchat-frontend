import {  useState } from 'react';
import { Button } from '../components/ui/button';
import { initMainAnimation } from '../lib/main-animation';
import AppLayout from '@/layouts/AppLayout';

const Home = () => {
    const [isSearching, setIsSearching] = useState(false);
    const startSearching = () => {
        initMainAnimation();
        setIsSearching(true);
    }
    const stopSearching = () => {
        document.querySelector("body canvas")?.remove();
        setIsSearching(false);
    }
    return (
        <AppLayout>

            {
                isSearching ?
                    <h2 className='text-2xl text-center md:text-5xl animate-pulse'>
                        Searching for someone to talk to...
                    </h2>
                    : <h2 className='text-2xl text-center md:text-5xl'>
                        Welcome to <span className='font-bold underline text-primary'>Ranonchat</span>
                    </h2>
            }
            <div className='absolute bottom-12 left-1/2 right-1/2 px-4 md:px-0 -translate-x-1/2 w-full max-w-[400px] flex flex-col justify-center items-center '>
                {
                    isSearching ? <Button variant="outline" className={'mt-5'} onClick={stopSearching}>Stop Searching</Button> 
                    : <Button className={'mt-5'} onClick={startSearching}>Start searching</Button>
                }
                <h4 className='mt-5 text-center'>
                    Find someone to talk to
                </h4>
                <p className='mt-5 text-center'>
                    Anybody can talk to anybody, anonymously. Your data is not stored and you can't be tracked.
                </p>

            </div>
        </AppLayout >
    );
};

export default Home;