export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: IRole;
    permissions: string[];
}

export interface IRole {
    id: number;
    name: string;
    permissions: IPermission[];
}

export interface IPermission {
    id: number;
    name: string;
}
