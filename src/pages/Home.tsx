import React, { useContext, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { initMainAnimation } from '../lib/main-animation';
import { useGlobalStore } from '@/store/globalStore';
import { SocketContext } from '@/layouts/AppLayout';
import { emptySocketMessage } from '@/data/empty-socket-message';
import { SocketMessage } from '@/@types/socket-message';
import { appSocketUrl, defaultSocketUrl } from '@/data/sockets';


const Home = () => {
    const globalStore = useGlobalStore();
    const { setSocketUrl, socket: { lastJsonMessage } } = useContext(SocketContext);
    useEffect(() => {
        const message = lastJsonMessage as SocketMessage || emptySocketMessage;
        if (message.type === "match") {
            globalStore.setChatData(message.payload);
            globalStore.setIsChatting(true);
            globalStore.setIsSearching(false);
        }
    }, [lastJsonMessage]);

    const startSearching = () => {
        setSocketUrl(appSocketUrl);
        initMainAnimation();
        globalStore.setIsSearching(true);
    }
    const stopSearching = () => {
        document.querySelector("body canvas")?.remove();
        globalStore.setIsSearching(false);
        setSocketUrl(defaultSocketUrl);
    }
    return (
        <React.Fragment>
            <div className='flex flex-col justify-center -translate-y-[130px]'>
                <div className='inline-block mx-auto'>
                    <img src="/ranonchat.png" alt="" width={260} />
                </div>
                {
                    globalStore.isSearching ?
                        <h2 className='text-2xl font-bold text-center md:text-5xl animate-pulse'>
                            Searching for someone to talk to...
                        </h2>
                        : <h2 className='text-2xl font-bold text-center md:text-5xl'>
                            Welcome to <span className='font-bold underline text-primary'>Ranonchat</span>
                        </h2>
                }
            </div>
            <div className='absolute bottom-12 left-1/2 right-1/2 px-4 md:px-0 -translate-x-1/2 w-full max-w-[400px] flex flex-col justify-center items-center '>
                {
                    globalStore.isSearching ? <Button variant="outline" className={'mt-5'} onClick={stopSearching}>Stop Searching</Button>
                        : <Button className={'mt-5'} onClick={startSearching}>Start searching</Button>
                }
                <h4 className='mt-5 text-center'>
                    Find someone to talk to
                </h4>
                <p className='mt-5 text-center'>
                    Anybody can talk to anybody, anonymously. Your data is not stored and you can't be tracked.
                </p>

            </div>
        </React.Fragment >
    );
};

export default Home;