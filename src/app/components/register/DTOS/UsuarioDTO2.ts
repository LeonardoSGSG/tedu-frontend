import { Usuario } from "src/app/entities/usuario";

export interface usuarioDTO2 extends Usuario{
    token: string;
}