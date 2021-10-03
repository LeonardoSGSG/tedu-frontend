import { Post } from "./post";

export interface enrolledCourses{
    id: number;
    teacher_id: number;
    name: string;
    vacancies: number;
    desc: string;
    start_date: Date;
    end_date: Date;
    posts: Post[];
}