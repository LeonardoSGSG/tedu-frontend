import { Usuario } from "src/app/entities/usuario";

export interface usuarioDTO extends Usuario{
    token: string;    
}