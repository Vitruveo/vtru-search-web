export interface Sections {
    sectionId: string;
    title: string;
    categories: string[];
    priceMultiplier: number;
    images: {
        preview: string;
    };
}

export interface Category {
    categoryId: string;
    title: string;
    images: {
        preview: string;
    };
}

export interface Catalog {
    sections: Sections[];
    categories: Category[];
    products: Products;
    config: Config;
}

export interface ProductItem {
    categoryId: string;
    productId: string;
    title: string;
    description: string;
    html: string;
    images: string[];
    chroma?: {
        vertical: {
            preview: string;
            images: string[];
        };
        horizontal: {
            preview: string;
            images: string[];
        };
        square: {
            preview: string;
            images: string[];
        };
    };
    price: number;
    shipping: number;
    area: number;
}

export interface Products {
    vertical: ProductItem[];
    horizontal: ProductItem[];
    square: ProductItem[];
    any: ProductItem[];
}

export interface Config {
    active: boolean;
    markup: number;
    discount: number;
    shipping: number;
}
