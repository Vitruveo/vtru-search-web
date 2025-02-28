export interface ProductType {
    title: string;
    price: number;
    discount: number;
    related: boolean;
    salesPrice: number;
    category: string[];
    gender: string;
    rating: number;
    stock: boolean;
    qty: number;
    colors: string[];
    photo: string;
    id: number | string;
    created: string;
    description: string;
}

export interface ProductFiterType {
    id: number;
    filterbyTitle?: string;
    name?: string;
    sort?: string;
    icon?: any;
    devider?: boolean;
}

export interface ProductCardProps {
    id?: string | number;
    color?: string;
    like: string;
    star: number;
    value?: string;
}
