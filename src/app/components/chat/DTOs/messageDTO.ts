import { receiver } from "./receiver";
import { sender } from "./sender";

export interface messageDTO{
    id: number,
    created: Date,
    updated: Date,
    text: string,
    receiver: receiver,
    sender: sender
}