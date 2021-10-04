import { usuarioPostDTO } from "./usuarioPostDTO";

export interface postDTO{
    text:string
    id:string;
    created:string;
    user:usuarioPostDTO;
}