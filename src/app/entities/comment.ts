import { Archivo } from "./archivo";
import { Usuario } from "./usuario";


export interface Comment{
    id: number;
    text: string;
    created: string;
    user: Usuario;
    qualified: boolean;
    files:Archivo[];
}