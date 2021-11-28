import { messageDTO } from "../components/chat/DTOs/messageDTO";
import { postDTO } from "../components/posts/DTOS/postDTO";
import { Comment } from "./comment";

export interface notification{

    id:number,
    created: Date,
    updated: Date,
    seen: boolean,
    text: string,
    type: string,
    message: messageDTO | null,
    post: postDTO | null,
    comment: Comment | null
}