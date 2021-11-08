import { enrolledCourses } from "./enrolledCourses";
import { ownedCourses } from "./ownedCourses";
import { Post } from "./post";
import { Schedule } from "./schedule";
import { Usuario } from "./usuario";
export interface Curso{
    id: number;
    teacher_id: number;
    teacher: Usuario;
    name: string;
    vacancies: number;
    desc: string;
    code: string;
    start_date: Date;
    weeks: number;
    schedule: Schedule[];
    posts: Post[];
    ownedCourses: ownedCourses[];
    enrolledCourses: enrolledCourses[]
}