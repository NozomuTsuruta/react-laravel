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

export interface IProduct {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
}

export interface IOrder {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    total: number;
    order_items: IOrderItem[];
}

export interface IOrderItem {
    id: number;
    product_title: string;
    price: number;
    quantity: number;
}