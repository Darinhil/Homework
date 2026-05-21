export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    stock: number;
    created_at?: Date | string;
}

export interface CreateProductInput {
    name: string;
    price: number;
    description: string;
    stock: number;
}
