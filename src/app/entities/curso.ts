import { enrolledCourses } from "./enrolledCourses";
import { ownedCourses } from "./ownedCourses";
import { Post } from "./post";
export interface Curso{
    id: number;
    teacher_id: number;
    name: string;
    vacancies: number;
    desc: string;
    code: string;
    start_date: Date;
    end_date: Date;
    posts: Post[];
    ownedCourses: ownedCourses[];
    enrolledCourses: enrolledCourses[]
}