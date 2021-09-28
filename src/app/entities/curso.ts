import { Post } from "./post";

export interface Curso{
    id: number;
    name: string;
    vacancies: number;
    desc: string;
    start_date: Date;
    end_date: Date;
    posts: Post[];
}