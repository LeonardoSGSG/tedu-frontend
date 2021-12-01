import { postDTO } from "../components/posts/DTOS/postDTO";
import { Archivo } from "./archivo";
import { Post } from "./post";
import { Usuario } from "./usuario";


export interface Comment{
    id: number;
    text: string;
    created: string;
    user: Usuario;
    qualified: boolean;
    files:Archivo[];
    post: Post
}