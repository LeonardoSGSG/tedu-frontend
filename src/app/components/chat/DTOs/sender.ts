import { Usuario } from "src/app/entities/usuario";

export interface sender
{
    name: string,
    created: Date,
    updated: Date,
    id: number,
    email: string
    token: string;
    phone: string|null;
    institution: string|null;
}