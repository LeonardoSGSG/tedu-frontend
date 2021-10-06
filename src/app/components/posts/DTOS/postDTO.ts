import { Post } from "src/app/entities/post";
import { Usuario } from "src/app/entities/usuario";

export interface postDTO extends Post{
    id:number;
    created:string;
    user:Usuario;
}