import { Archivo } from 'src/app/entities/archivo';
export interface msg{
    text: string,
    userId: string | null,
    files: Archivo[] | null
}