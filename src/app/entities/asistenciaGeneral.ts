import { AsistenciaDetalle } from "./asistenciaDetalle";
import {Usuario} from "./usuario";
export interface AsistenciaGeneral{
    id: number;
    attendance_date: string;
    hora:string;
    registered: boolean;
    userAttendances:AsistenciaDetalle[];
}