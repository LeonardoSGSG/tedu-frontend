import { usuarioDTO } from "./UsuarioDTO";

export interface respuestaLogin{
    user: usuarioDTO;
    statusCode: number;
    message: string;
    error: string;
}