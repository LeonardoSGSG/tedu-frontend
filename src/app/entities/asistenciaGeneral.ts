import {Usuario} from "./usuario";
export interface AsistenciaGeneral{
    id: number;
    attendance_date: string;
    registered: boolean;
    userAttendances:{
        attended: boolean;
        user: Usuario;
    };
}