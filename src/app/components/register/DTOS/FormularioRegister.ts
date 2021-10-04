import { Usuario } from "src/app/entities/usuario";

export interface FormularioRegister extends Usuario{
    password:string
}