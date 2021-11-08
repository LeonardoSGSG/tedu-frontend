import { receiver } from "./receiver";
import { sender } from "./sender";

export interface message{
    id: number,
    created: Date,
    updated: Date,
    text: string,
    receiver: receiver
    sender: sender
}