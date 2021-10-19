export interface usuarioDTO{
    id: number;
    token: string;
    name: string;
    email: string;
    phone: string|null;
    institution: string|null;
}