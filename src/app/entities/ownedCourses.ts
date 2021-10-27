import { Usuario } from "./usuario"
import { Post } from "./post";

export interface ownedCourses{
    id: number;
    teacher: Usuario;
    name: string;
    vacancies: number;
    desc: string;
    start_date: Date;
    end_date: Date;
    code: string;
    posts: Post[];
}