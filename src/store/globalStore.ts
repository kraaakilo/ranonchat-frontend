import { ChatData } from '@/@types/message'
import { SingleChatProps } from '@/components/SingleChat'
import { create } from 'zustand'

interface GlobalStore {
    chatData: ChatData
    isChatting: boolean
    isSearching: boolean
    messages: SingleChatProps[]
    setChatData: (chatData: ChatData) => void
    setIsChatting: (isChatting: boolean) => void
    setIsSearching: (isSearching: boolean) => void
    setMessages: (messages: SingleChatProps[]) => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
    chatData: {} as ChatData,
    isChatting: false,
    isSearching: false,
    messages: [],
    setChatData: (chatData) => set(() => ({ chatData: chatData })),
    setIsChatting: (isChatting) => set(() => ({ isChatting: isChatting })),
    setIsSearching: (isSearching) => set(() => ({ isSearching: isSearching })),
    setMessages: (messages) => set(() => ({ messages: messages })),
}));

useGlobalStore.subscribe(
    (state) => {
        if(state.isSearching === false){
            document.querySelector("body canvas")?.remove();
        }
    }
)