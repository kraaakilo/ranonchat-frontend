import { SingleChatProps } from '@/components/SingleChat';
import { ModeToggle } from '@/components/mode-toggle';
import { toast } from '@/components/ui/use-toast';
import { defaultSocketUrl } from '@/data/sockets';
import useAudioPlayer from '@/hooks/useAudioPlayer';
import { useGlobalStore } from '@/store/globalStore';
import React, { createContext, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { WebSocketHook } from 'react-use-websocket/dist/lib/types';

type AppLayoutProps = {
    children: React.ReactNode
}

type SocketContextProps = {
    socket: WebSocketHook,
    setSocketUrl: React.Dispatch<React.SetStateAction<string>>,
    socketUrl: string
}

export const SocketContext = createContext<SocketContextProps>({} as SocketContextProps);


const AppLayout = ({ children }: AppLayoutProps) => {
    const globalStore = useGlobalStore();

    const [socketUrl, setSocketUrl] = useState(defaultSocketUrl);
    const socket = useWebSocket(socketUrl);

    const { playNotificationSound } = useAudioPlayer("/sounds/notification.mp3");

    useEffect(() => {
        const message = socket.lastJsonMessage || JSON.parse(socket.lastMessage?.data || "{}");
        if (message.type === "quit") {
            toast({
                variant: "destructive",
                title: "Your chat partner left",
                description: "You can start searching again to find someone to talk to.",
            });
            globalStore.setIsChatting(false);
            setSocketUrl(defaultSocketUrl);
        }
        if (message.type === "message") {
            playNotificationSound();
            const chat: SingleChatProps = {
                message: message.message,
                isUser: false
            }
            globalStore.setMessages([...globalStore.messages, chat]);
        }
    }, [socket.lastJsonMessage]);


    return (
        <SocketContext.Provider value={{
            socket,
            setSocketUrl,
            socketUrl
        }}>
            {
                !globalStore.isChatting &&
                <header className='flex justify-end px-8 pt-1'>
                    <ModeToggle />
                </header>
            }
            <main className='container relative flex items-center justify-center min-h-screen mx-auto font-inter'>
                {children}
            </main>
        </SocketContext.Provider>
    );
};

export default AppLayout;