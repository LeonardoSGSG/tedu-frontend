import { Post } from "src/app/entities/post";
import { Usuario } from "src/app/entities/usuario";

export interface postDTO extends Post{
    id:string;
    created:string;
    user:Usuario;
}