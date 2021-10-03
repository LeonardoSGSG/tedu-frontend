import { usuarioPostDTO } from "./usuarioPostDTO";

export interface postDTO{
    id:string;
    created:string;
    usuario:usuarioPostDTO;
}