import { Curso } from "./curso";

export interface Post{
    id:number;
    text:string;
    qualified:boolean;
    course: Curso
}
