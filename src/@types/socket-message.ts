import { ChatData } from "./message";

export type SocketMessage = {
    type : string;
    payload : ChatData;
}