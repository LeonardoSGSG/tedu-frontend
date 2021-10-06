import { usuarioDTO2 } from "./UsuarioDTO2";

export interface respuestaRegister{
    user: usuarioDTO2;
    statusCode: number;
    message: string;
    error: string;
}