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
}

export interface ProductItem {
    categoryId: string;
    productId: string;
    title: string;
    description: string;
    html: string;
    images: string[];
    price: number;
    shipping: number;
    area: number;
}

export interface Products {
    vertical: ProductItem[];
    horizontal: ProductItem[];
    square: ProductItem[];
}
