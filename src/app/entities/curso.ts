import { enrolledCourses } from "./enrolledCourses";
import { ownedCourses } from "./ownedCourses";
import { Post } from "./post";
import { Schedule } from "./schedule";
export interface Curso{
    id: number;
    teacher_id: number;
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