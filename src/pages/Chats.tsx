import SingleChat from '../components/SingleChat';
import { Button } from '../components/ui/button';
import { LogOut } from 'lucide-react';
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
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { useContext, useEffect, useRef, useState } from 'react';
import { useGlobalStore } from '@/store/globalStore';
import { SocketContext } from '@/layouts/AppLayout';

const Chats = () => {
    const messagesRef = useRef<HTMLDivElement>(null);
    const globalStore = useGlobalStore();
    const {socket: { sendMessage, getWebSocket}} = useContext(SocketContext);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const messagesDiv = messagesRef.current!;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        return () => {
            getWebSocket()?.close();
        }
    },[getWebSocket]);
    const handleCloseChat = () => {
        globalStore.setIsChatting(false);
        location.reload();
    }
    const send = () => {
        const data = {
            type : "message",
            payload : {
                from : globalStore.chatData.from,
                to : globalStore.chatData.to,
                content : message,
                timestamp : new Date().toISOString(),
            }
        }
        sendMessage(JSON.stringify(data));
        const chat = {
            message,
            isUser: true
        }

        const messagesDiv = messagesRef.current!;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        globalStore.setMessages([...globalStore.messages, chat]);
        setMessage("");
    }
    return (
        <main className='container relative flex items-center justify-center min-h-screen px-2 mx-auto'>
            <div className="flex flex-col justify-between flex-1 h-screen max-w-4xl p:2 sm:p-6">
                <div className="flex justify-between py-3 border-b-2 sm:items-center">
                    <div className='flex items-center justify-center'>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <LogOut className='text-red-500' />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Close connection ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You will quit the chat and lose your connection with your partner.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>
                                        <a onClick={handleCloseChat} className='font-bold text-destructive'>Close</a>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <div className="relative flex flex-col items-center space-x-4">
                        <h2 className='text-sm md:text-lg'>You are now chatting as</h2>
                        <div className="flex flex-col leading-tight">
                            <div className="flex items-center mt-1 text-xl">
                                <span className="mr-3 text-sm font-semibold text-muted-foreground md:text-lg">
                                    {globalStore.chatData.username}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src="/ranonchat.png" alt="" width={50} />
                    </div>
                </div>
                <div
                    id="messages"
                    ref={messagesRef}
                    className="flex flex-col flex-1 p-3 space-y-4 overflow-y-auto"
                >
                    {
                        globalStore.messages.map((item, index) => {
                            return <SingleChat key={index} message={item.message} isUser={item.isUser} />
                        })
                    }
                </div>
                <div className="px-4 pt-4 mb-2 border-t-2 sm:mb-0">
                    <div className="relative flex">
                        <Input
                            type="text"
                            placeholder="Write your ranonchat ..."
                            className='py-6 focus-visible:ring-0'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && message.length > 0) {
                                    send();
                                }
                            }}
                        />
                        <div className="absolute inset-y-0 right-0 items-center sm:flex">
                            <Button
                                disabled={message.length === 0}
                                className='h-full'
                                onClick={send}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5 transform rotate-90"
                                >
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Chats;